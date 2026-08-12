/**
 * Cloudflare Pages Function — contact form handler.
 *
 * POST /api/contact
 *
 * Sends two branded emails through Resend:
 *   1. a notification to Treasured Vessels, with reply-to set to the enquirer
 *   2. a confirmation to the person who filled in the form
 *
 * Environment variables (Cloudflare Pages → Settings → Environment variables):
 *   RESEND_API_KEY     required — Resend API key
 *   CONTACT_TO_EMAIL   optional — defaults to the organisation's inbox
 *   CONTACT_FROM_EMAIL optional — must be on a domain verified in Resend
 */

interface Env {
  RESEND_API_KEY: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

/**
 * Minimal local typing for the Pages Functions context, so this file needs no
 * @cloudflare/workers-types dependency. Cloudflare compiles it at deploy time.
 */
interface RequestContext {
  request: Request;
  env: Env;
}

const DEFAULT_TO = "treasuredvesselsug@gmail.com";
const DEFAULT_FROM = "Treasured Vessels Girls' Centre <noreply@treasuredvesselsuganda.org>";

const SITE = "https://treasuredvesselsuganda.org";
const ORG = "Treasured Vessels Girls' Centre";
const PHONE_1 = "+256 756 233 041";
const PHONE_2 = "+256 774 427 101";

// Brand palette
const PLUM = "#552050";
const PINK = "#E43F8C";
const CREAM = "#FFF8F0";
const CHARCOAL = "#25222B";
const MUTED = "#6b6672";

interface Payload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** Hidden field — real people leave it empty, bots fill it in */
  company?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

/** Escape user input before it goes anywhere near an HTML email. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Preserve the enquirer's line breaks in HTML. */
function paragraphs(text: string): string {
  return esc(text)
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 14px;color:${CHARCOAL};font-size:16px;line-height:1.6;">${block.replace(
          /\n/g,
          "<br />",
        )}</p>`,
    )
    .join("");
}

/** Shared branded shell so both emails look like the site. */
function shell(opts: { preheader: string; heading: string; body: string }): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${esc(opts.heading)}</title>
</head>
<body style="margin:0;padding:0;background:${CREAM};-webkit-font-smoothing:antialiased;">
  <span style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">${esc(
    opts.preheader,
  )}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:28px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 2px 12px rgba(85,32,80,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:${PLUM};padding:26px 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;vertical-align:middle;">
                    <img src="${SITE}/images/logo.png" width="40" height="40" alt="" style="display:block;border:0;" />
                  </td>
                  <td style="vertical-align:middle;">
                    <div style="color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:19px;line-height:1.2;">Treasured Vessels</div>
                    <div style="color:#EAD9E6;font-family:Arial,Helvetica,sans-serif;font-size:10px;letter-spacing:2px;text-transform:uppercase;">Girls' Centre</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:34px 32px 28px;font-family:Arial,Helvetica,sans-serif;">
              <h1 style="margin:0 0 18px;color:${PLUM};font-family:Georgia,'Times New Roman',serif;font-size:25px;line-height:1.3;font-weight:normal;">${esc(
                opts.heading,
              )}</h1>
              ${opts.body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:${PLUM};padding:24px 32px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0 0 8px;color:#ffffff;font-size:14px;font-weight:bold;">${ORG}</p>
              <p style="margin:0 0 4px;color:#EAD9E6;font-size:13px;line-height:1.6;">
                Walukuba-Masese Road, Jinja District, Uganda
              </p>
              <p style="margin:0 0 12px;color:#EAD9E6;font-size:13px;line-height:1.6;">
                ${PHONE_1} &nbsp;·&nbsp; ${PHONE_2}
              </p>
              <a href="${SITE}" style="color:#ffffff;font-size:13px;text-decoration:underline;">treasuredvesselsuganda.org</a>
            </td>
          </tr>
        </table>

        <p style="margin:16px 0 0;color:${MUTED};font-family:Arial,Helvetica,sans-serif;font-size:11px;">
          A women-led community organisation in Jinja, Uganda.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid #EFE6EC;color:${MUTED};font-size:13px;width:104px;vertical-align:top;">${esc(
      label,
    )}</td>
    <td style="padding:9px 0;border-bottom:1px solid #EFE6EC;color:${CHARCOAL};font-size:15px;">${value}</td>
  </tr>`;
}

function notificationEmail(d: Required<Omit<Payload, "company">>, received: string) {
  const name = `${d.firstName} ${d.lastName}`.trim();
  return shell({
    preheader: `New website enquiry from ${name}`,
    heading: "New enquiry from the website",
    body: `
      <p style="margin:0 0 20px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
        Someone has sent a message through the contact form on your website.
        Replying to this email will go straight back to them.
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
        ${row("Name", esc(name))}
        ${row("Email", `<a href="mailto:${esc(d.email)}" style="color:${PINK};">${esc(d.email)}</a>`)}
        ${d.phone ? row("Phone", `<a href="tel:${esc(d.phone.replace(/[^\d+]/g, ""))}" style="color:${PINK};">${esc(d.phone)}</a>`) : ""}
        ${row("Received", esc(received))}
      </table>
      <p style="margin:0 0 8px;color:${MUTED};font-size:13px;text-transform:uppercase;letter-spacing:1px;">Message</p>
      <div style="background:${CREAM};border-left:3px solid ${PINK};border-radius:8px;padding:16px 18px;">
        ${paragraphs(d.message)}
      </div>
      <p style="margin:26px 0 0;">
        <a href="mailto:${esc(d.email)}" style="display:inline-block;background:${PINK};color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;padding:13px 26px;border-radius:999px;">Reply to ${esc(
          d.firstName,
        )}</a>
      </p>`,
  });
}

function confirmationEmail(d: Required<Omit<Payload, "company">>) {
  return shell({
    preheader: "Thank you for contacting Treasured Vessels Girls' Centre — we have your message.",
    heading: `Thank you, ${esc(d.firstName)}`,
    body: `
      <p style="margin:0 0 16px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
        We have received your message and someone from our team in Jinja will read it personally.
        We normally reply within a few working days.
      </p>
      <p style="margin:0 0 24px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
        If your enquiry is urgent, or concerns a girl who may be at immediate risk,
        please call us on <a href="tel:+256756233041" style="color:${PINK};">${PHONE_1}</a>
        rather than waiting for a reply.
      </p>
      <p style="margin:0 0 8px;color:${MUTED};font-size:13px;text-transform:uppercase;letter-spacing:1px;">Your message</p>
      <div style="background:${CREAM};border-left:3px solid ${PINK};border-radius:8px;padding:16px 18px;margin:0 0 26px;">
        ${paragraphs(d.message)}
      </div>
      <p style="margin:0 0 20px;color:${CHARCOAL};font-size:16px;line-height:1.6;">
        While you wait, you might like to read about
        <a href="${SITE}/blog/what-it-means-to-be-a-treasured-vessel" style="color:${PINK};">what it means to be a Treasured Vessel</a>,
        or see <a href="${SITE}/programs" style="color:${PINK};">the six programmes</a> we run.
      </p>
      <p style="margin:0;">
        <a href="${SITE}" style="display:inline-block;background:${PINK};color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;padding:13px 26px;border-radius:999px;">Visit our website</a>
      </p>
      <p style="margin:26px 0 0;color:${MUTED};font-size:12px;line-height:1.6;">
        You are receiving this because this address was entered into the contact form at
        treasuredvesselsuganda.org. If that was not you, please ignore this email.
      </p>`,
  });
}

async function sendViaResend(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, body: text };
}

export const onRequest = async ({ request, env }: RequestContext): Promise<Response> => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed." }, 405);
  }

  if (!env.RESEND_API_KEY) {
    console.error("contact: RESEND_API_KEY is not configured");
    return json({ error: "Email is not configured on the server." }, 500);
  }

  let data: Payload;
  try {
    data = (await request.json()) as Payload;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: silently accept so bots don't learn they were caught.
  if (data.company && data.company.trim() !== "") {
    return json({ ok: true });
  }

  const firstName = (data.firstName ?? "").trim().slice(0, 100);
  const lastName = (data.lastName ?? "").trim().slice(0, 100);
  const email = (data.email ?? "").trim().slice(0, 200);
  const phone = (data.phone ?? "").trim().slice(0, 60);
  const message = (data.message ?? "").trim().slice(0, 5000);

  const errors: string[] = [];
  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email address is required.");
  if (!message) errors.push("A message is required.");
  if (errors.length) return json({ error: errors.join(" ") }, 400);

  const clean = { firstName, lastName, email, phone, message };
  const to = env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const received = new Date().toUTCString();
  const name = `${firstName} ${lastName}`.trim();

  // The notification matters most — if it fails, the enquiry is lost.
  const notify = await sendViaResend(env.RESEND_API_KEY, {
    from,
    to: [to],
    reply_to: email,
    subject: `New website enquiry from ${name}`,
    html: notificationEmail(clean, received),
    text:
      `New website enquiry\n\nName: ${name}\nEmail: ${email}\n` +
      (phone ? `Phone: ${phone}\n` : "") +
      `Received: ${received}\n\n${message}\n`,
  });

  if (!notify.ok) {
    console.error("contact: Resend notification failed", notify.status, notify.body);
    return json({ error: "We could not send your message. Please email us directly." }, 502);
  }

  // The confirmation is a courtesy — never fail the request over it.
  const confirm = await sendViaResend(env.RESEND_API_KEY, {
    from,
    to: [email],
    reply_to: to,
    subject: `Thank you for contacting ${ORG}`,
    html: confirmationEmail(clean),
    text:
      `Thank you, ${firstName}.\n\nWe have received your message and someone from our team in Jinja ` +
      `will read it personally. We normally reply within a few working days.\n\n` +
      `If your enquiry is urgent, please call ${PHONE_1}.\n\nYour message:\n${message}\n\n${ORG}\n${SITE}\n`,
  });

  if (!confirm.ok) {
    console.error("contact: Resend confirmation failed", confirm.status, confirm.body);
  }

  return json({ ok: true, confirmationSent: confirm.ok });
};
