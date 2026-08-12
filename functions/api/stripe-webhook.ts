import {
  CHARCOAL,
  CREAM,
  DEFAULT_FROM,
  DEFAULT_TO,
  MUTED,
  ORG,
  PHONE_1,
  PINK,
  PLUM,
  SITE,
  esc,
  json,
  row,
  sendViaResend,
  shell,
} from "../_shared/email";

/**
 * Cloudflare Pages Function — Stripe webhook.
 *
 * POST /api/stripe-webhook
 *
 * Stripe calls this when a donation completes. It sends the centre a
 * notification and the donor a branded thank-you, so nobody has to watch the
 * Stripe dashboard to know a gift arrived.
 *
 * The endpoint is public, so the signature is verified before anything is
 * trusted — without that check anyone could post a fake donation and trigger
 * emails. Verification uses Web Crypto, which the Workers runtime provides.
 *
 * Environment variables (Cloudflare Pages → Settings → Environment variables):
 *   STRIPE_WEBHOOK_SECRET  required — whsec_… from the endpoint's signing secret
 *   RESEND_API_KEY         required — shared with the contact form
 *   CONTACT_TO_EMAIL       optional — defaults to the organisation's inbox
 *   CONTACT_FROM_EMAIL     optional — must be on a domain verified in Resend
 */

interface Env {
  STRIPE_WEBHOOK_SECRET: string;
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface RequestContext {
  request: Request;
  env: Env;
}

/** Reject signatures older than this, so a captured request cannot be replayed. */
const TOLERANCE_SECONDS = 300;

interface StripeEvent {
  id: string;
  type: string;
  data: { object: Record<string, unknown> };
}

/** Constant-time compare, so a wrong signature leaks nothing through timing. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function toHex(buffer: ArrayBuffer): string {
  return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Verifies Stripe's `Stripe-Signature` header against the raw body.
 *
 * The header looks like `t=1699999999,v1=abc…,v1=def…` — more than one v1 is
 * normal while a secret is being rotated, so any match counts.
 */
async function verifySignature(
  payload: string,
  header: string | null,
  secret: string,
): Promise<boolean> {
  if (!header) return false;

  const parts = Object.create(null) as Record<string, string[]>;
  for (const pair of header.split(",")) {
    const [key, value] = pair.split("=", 2);
    if (!key || !value) continue;
    (parts[key.trim()] ??= []).push(value.trim());
  }

  const timestamp = parts.t?.[0];
  const signatures = parts.v1;
  if (!timestamp || !signatures?.length) return false;

  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  if (!Number.isFinite(age) || Math.abs(age) > TOLERANCE_SECONDS) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(`${timestamp}.${payload}`),
  );
  const expected = toHex(mac);

  return signatures.some((signature) => timingSafeEqual(signature, expected));
}

/** Stripe amounts are in the smallest unit; USD has two decimals. */
function money(amount: number | null | undefined, currency: string): string {
  if (typeof amount !== "number") return "—";
  return `${currency.toUpperCase()} ${(amount / 100).toFixed(2)}`;
}

interface Donation {
  name: string;
  email: string;
  phone: string;
  fund: string;
  monthly: boolean;
  amount: string;
  message: string;
  reference: string;
}

function notificationEmail(d: Donation, received: string): string {
  return shell({
    preheader: `${d.monthly ? "New monthly donation" : "New donation"} of ${d.amount} from ${d.name}`,
    heading: d.monthly ? "New monthly donation" : "New donation",
    body: `
      <p style="margin:0 0 20px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
        A donation has come through the website. It has already been taken by Stripe &mdash;
        nothing further is needed from you.
      </p>
      <div style="background:${CREAM};border-left:3px solid ${PINK};border-radius:8px;padding:18px 20px;margin:0 0 24px;">
        <div style="color:${MUTED};font-size:13px;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">Amount</div>
        <div style="color:${PLUM};font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;">${esc(
          d.amount,
        )}${d.monthly ? '<span style="font-size:16px;"> a month</span>' : ""}</div>
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
        ${row("Donor", esc(d.name))}
        ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:${PINK};">${esc(d.email)}</a>`)}
        ${
          d.phone
            ? row(
                "Phone",
                `<a href="tel:${esc(d.phone.replace(/[^\d+]/g, ""))}" style="color:${PINK};">${esc(d.phone)}</a>`,
              )
            : ""
        }
        ${row("Directed to", esc(d.fund))}
        ${row("Type", d.monthly ? "Monthly, recurring" : "One-off")}
        ${row("Received", esc(received))}
        ${row("Reference", `<span style="font-family:monospace;font-size:13px;">${esc(d.reference)}</span>`)}
      </table>
      ${
        d.message
          ? `<p style="margin:0 0 8px;color:${MUTED};font-size:13px;text-transform:uppercase;letter-spacing:1px;">Message from the donor</p>
             <div style="background:${CREAM};border-left:3px solid ${PINK};border-radius:8px;padding:16px 18px;margin:0 0 24px;">
               <p style="margin:0;color:${CHARCOAL};font-size:16px;line-height:1.6;">${esc(d.message)}</p>
             </div>`
          : ""
      }
      <p style="margin:0;">
        <a href="mailto:${esc(d.email)}" style="display:inline-block;background:${PINK};color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;padding:13px 26px;border-radius:999px;">Thank ${esc(
          d.name.split(" ")[0],
        )} personally</a>
      </p>`,
  });
}

function thankYouEmail(d: Donation): string {
  const firstName = d.name.split(" ")[0] || "friend";
  return shell({
    preheader: `Thank you for your donation to ${ORG}.`,
    heading: `Thank you, ${esc(firstName)}`,
    body: `
      <p style="margin:0 0 16px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
        Your ${d.monthly ? "monthly gift" : "gift"} of <strong>${esc(d.amount)}</strong> has been
        received, and it will be put to work in Jinja by the people who know these girls by name.
      </p>
      <p style="margin:0 0 24px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
        You asked us to direct it to <strong>${esc(d.fund)}</strong>. Stripe has sent your receipt
        separately &mdash; this note is just to say thank you properly.
      </p>
      ${
        d.monthly
          ? `<p style="margin:0 0 24px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
               Your gift will repeat each month. You can change or stop it at any time by replying
               to this email &mdash; no explanation needed, and no hard feelings.
             </p>`
          : ""
      }
      <p style="margin:0 0 8px;color:${MUTED};font-size:13px;text-transform:uppercase;letter-spacing:1px;">What we will and will not send you</p>
      <div style="background:${CREAM};border-left:3px solid ${PINK};border-radius:8px;padding:16px 18px;margin:0 0 26px;">
        <p style="margin:0;color:${CHARCOAL};font-size:15px;line-height:1.6;">
          We do not send photographs of individual girls, and we never share identifying details.
          What we do send is an honest account of what your support funded and what changed.
        </p>
      </div>
      <p style="margin:0 0 20px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
        If you would like to understand the work better, you might start with
        <a href="${SITE}/blog/what-it-means-to-be-a-treasured-vessel" style="color:${PINK};">what it means to be a Treasured Vessel</a>,
        or <a href="${SITE}/programs" style="color:${PINK};">the six programmes</a> we run.
      </p>
      <p style="margin:0;">
        <a href="${SITE}" style="display:inline-block;background:${PINK};color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;padding:13px 26px;border-radius:999px;">Visit our website</a>
      </p>
      <p style="margin:26px 0 0;color:${MUTED};font-size:12px;line-height:1.6;">
        Questions about your gift? Reply to this email, or call ${PHONE_1}.
      </p>`,
  });
}

export const onRequest = async ({ request, env }: RequestContext): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  if (!env.STRIPE_WEBHOOK_SECRET) {
    console.error("stripe-webhook: STRIPE_WEBHOOK_SECRET is not set");
    return json({ error: "Webhook is not configured." }, 500);
  }

  // The raw body is what was signed — parsing and re-serialising would change
  // the bytes and break verification.
  const payload = await request.text();
  const verified = await verifySignature(
    payload,
    request.headers.get("stripe-signature"),
    env.STRIPE_WEBHOOK_SECRET,
  );
  if (!verified) {
    console.warn("stripe-webhook: signature verification failed");
    return json({ error: "Invalid signature." }, 400);
  }

  let event: StripeEvent;
  try {
    event = JSON.parse(payload) as StripeEvent;
  } catch {
    return json({ error: "Invalid payload." }, 400);
  }

  // Anything else is acknowledged so Stripe stops retrying it. Recurring
  // renewals arrive as invoice.payment_succeeded; the first charge of a new
  // subscription is already covered by checkout.session.completed, so it is
  // skipped here to avoid thanking a donor twice for the same payment.
  if (event.type !== "checkout.session.completed") {
    return json({ received: true, handled: false, type: event.type });
  }

  const session = event.data.object as {
    id?: string;
    amount_total?: number;
    currency?: string;
    customer_email?: string;
    customer_details?: { email?: string; name?: string };
    mode?: string;
    payment_status?: string;
    metadata?: Record<string, string>;
  };

  // A session can complete without being paid (e.g. an async method still
  // pending). Only act once the money is actually there.
  if (session.payment_status !== "paid" && session.mode !== "subscription") {
    return json({ received: true, handled: false, reason: session.payment_status });
  }

  const meta = session.metadata ?? {};
  const email = session.customer_email || session.customer_details?.email || "";
  const donation: Donation = {
    name: meta.donor_name || session.customer_details?.name || "A supporter",
    email,
    phone: meta.donor_phone || "",
    fund: meta.fund || "Where needed most",
    monthly: meta.frequency === "monthly" || session.mode === "subscription",
    amount: money(session.amount_total, session.currency || "usd"),
    message: meta.donor_message || "",
    reference: session.id || event.id,
  };

  const to = env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const received = new Date().toUTCString();

  // Notify the centre first. If this fails, a non-2xx makes Stripe retry, and
  // the donor has not been emailed yet, so the retry cannot duplicate anything.
  const notify = await sendViaResend(env.RESEND_API_KEY, {
    from,
    to: [to],
    ...(donation.email ? { reply_to: donation.email } : {}),
    subject: `${donation.monthly ? "New monthly donation" : "New donation"}: ${donation.amount} from ${donation.name}`,
    html: notificationEmail(donation, received),
    text:
      `${donation.monthly ? "New monthly donation" : "New donation"}\n\n` +
      `Amount: ${donation.amount}${donation.monthly ? " a month" : ""}\n` +
      `Donor: ${donation.name}\nEmail: ${donation.email}\n` +
      (donation.phone ? `Phone: ${donation.phone}\n` : "") +
      `Directed to: ${donation.fund}\nReceived: ${received}\nReference: ${donation.reference}\n` +
      (donation.message ? `\nMessage:\n${donation.message}\n` : ""),
  });

  if (!notify.ok) {
    console.error("stripe-webhook: notification failed", notify.status, notify.body);
    return json({ error: "Notification failed." }, 500);
  }

  // The donor's thank-you is a courtesy on top of Stripe's own receipt, so a
  // failure here is logged rather than retried — a retry would re-notify the
  // centre for a donation it already knows about.
  if (donation.email) {
    const thanks = await sendViaResend(env.RESEND_API_KEY, {
      from,
      to: [donation.email],
      reply_to: to,
      subject: `Thank you for your donation to ${ORG}`,
      html: thankYouEmail(donation),
      text:
        `Thank you, ${donation.name.split(" ")[0] || "friend"}.\n\n` +
        `Your ${donation.monthly ? "monthly gift" : "gift"} of ${donation.amount} has been received, ` +
        `directed to ${donation.fund}.\n\n` +
        `We do not send photographs of individual girls and never share identifying details. ` +
        `What we do send is an honest account of what your support funded and what changed.\n\n` +
        `Questions? Reply to this email, or call ${PHONE_1}.\n\n${ORG}\n${SITE}\n`,
    });
    if (!thanks.ok) {
      console.error("stripe-webhook: donor thank-you failed", thanks.status, thanks.body);
    }
  }

  return json({ received: true, handled: true });
};
