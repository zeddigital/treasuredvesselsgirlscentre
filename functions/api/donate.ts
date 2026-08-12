/**
 * Cloudflare Pages Function — donation handler.
 *
 * POST /api/donate
 *
 * Creates a Stripe Checkout Session and returns its URL for the browser to
 * redirect to. Card details are only ever entered on Stripe's own page, so no
 * payment data touches this site.
 *
 * The amount is validated and converted to cents here, not in the browser —
 * anything posted from the client is treated as a suggestion.
 *
 * Environment variables (Cloudflare Pages → Settings → Environment variables):
 *   STRIPE_SECRET_KEY  required — sk_live_… or sk_test_…
 *   DONATION_CURRENCY  optional — ISO code, defaults to usd
 */

interface Env {
  STRIPE_SECRET_KEY: string;
  DONATION_CURRENCY?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

const SITE = "https://treasuredvesselsuganda.org";
const ORG = "Treasured Vessels Girls' Centre";
const DEFAULT_CURRENCY = "usd";

/** Stripe rejects very small charges, and a huge one is far more likely a typo. */
const MIN_AMOUNT = 2;
const MAX_AMOUNT = 50_000;

/** Labels for the fund the donor chose, keyed by the radio values on the page. */
const FUNDS: Record<string, string> = {
  "where-needed": "Where needed most",
  education: "Girls' Education",
  skills: "Skills Training",
  health: "Menstrual Health",
};

interface Payload {
  amount?: string | number;
  monthly?: boolean;
  fund?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** Honeypot — bots fill hidden fields in, real donors never see it. */
  company?: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

/**
 * Stripe's API takes form encoding, including for nested fields, which are
 * expressed as bracketed keys — line_items[0][price_data][currency]. Building
 * that by hand from a plain object keeps this dependency-free, since the
 * Stripe SDK is heavier than the whole rest of this function.
 */
function formEncode(
  value: unknown,
  prefix = "",
  out: URLSearchParams = new URLSearchParams(),
): URLSearchParams {
  if (value === undefined || value === null) return out;
  if (Array.isArray(value)) {
    value.forEach((item, index) => formEncode(item, `${prefix}[${index}]`, out));
  } else if (typeof value === "object") {
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      formEncode(item, prefix ? `${prefix}[${key}]` : key, out);
    }
  } else {
    out.append(prefix, String(value));
  }
  return out;
}

export const onRequest = async ({ request, env }: RequestContext): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  if (!env.STRIPE_SECRET_KEY) {
    console.error("donate: STRIPE_SECRET_KEY is not set");
    return json({ error: "Donations are not configured on the server." }, 500);
  }

  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Quietly accept and discard anything that filled the honeypot.
  if (data.company && data.company.trim() !== "") {
    return json({ error: "Invalid request." }, 400);
  }

  const amount = Number(data.amount);
  if (!Number.isFinite(amount) || amount < MIN_AMOUNT || amount > MAX_AMOUNT) {
    return json(
      { error: `Please enter an amount between ${MIN_AMOUNT} and ${MAX_AMOUNT.toLocaleString()}.` },
      400,
    );
  }
  // Round to cents rather than truncating, so 10.005 does not become 10.00.
  const unitAmount = Math.round(amount * 100);

  const firstName = (data.firstName ?? "").trim().slice(0, 100);
  const lastName = (data.lastName ?? "").trim().slice(0, 100);
  const email = (data.email ?? "").trim().slice(0, 200);
  const phone = (data.phone ?? "").trim().slice(0, 60);
  const message = (data.message ?? "").trim().slice(0, 500);

  if (!firstName || !lastName) {
    return json({ error: "Please give your first and last name." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please give a valid email address." }, 400);
  }

  const monthly = data.monthly === true;
  const fundKey = data.fund && FUNDS[data.fund] ? data.fund : "where-needed";
  const fundLabel = FUNDS[fundKey];
  const currency = (env.DONATION_CURRENCY || DEFAULT_CURRENCY).toLowerCase();
  const donorName = `${firstName} ${lastName}`.trim();

  const productName = monthly
    ? `Monthly donation to ${ORG}`
    : `Donation to ${ORG}`;

  const session = {
    mode: monthly ? "subscription" : "payment",
    // Stripe collects the card; the donor never enters one on our pages.
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency,
          unit_amount: unitAmount,
          product_data: {
            name: productName,
            description: `Directed to: ${fundLabel}`,
          },
          ...(monthly ? { recurring: { interval: "month" } } : {}),
        },
      },
    ],
    customer_email: email,
    // Carried through to the payment and the subscription, so the dashboard
    // shows who gave and what they asked it to fund.
    metadata: {
      donor_name: donorName,
      donor_email: email,
      donor_phone: phone,
      fund: fundLabel,
      frequency: monthly ? "monthly" : "one-off",
      ...(message ? { donor_message: message } : {}),
      source: "treasuredvesselsuganda.org/donate",
    },
    success_url: `${SITE}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE}/donate?cancelled=1`,
    // Address helps with fraud checks and with thanking donors properly.
    billing_address_collection: "auto",
    ...(monthly
      ? {}
      : {
          // Only valid on one-off payments; subscriptions carry it per invoice.
          payment_intent_data: {
            description: `${productName} — ${fundLabel}`,
            metadata: { donor_name: donorName, fund: fundLabel },
          },
        }),
  };

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "content-type": "application/x-www-form-urlencoded",
      // Ties this request to the API shape the code was written against.
      "stripe-version": "2024-06-20",
    },
    body: formEncode(session).toString(),
  });

  const body = (await response.json().catch(() => ({}))) as {
    url?: string;
    error?: { message?: string };
  };

  if (!response.ok || !body.url) {
    // Stripe's own error text can name internal configuration, so it is logged
    // rather than returned to the donor.
    console.error("donate: Stripe session failed", response.status, JSON.stringify(body));
    return json({ error: "We could not start the payment just now. Please try again." }, 502);
  }

  return json({ url: body.url });
};
