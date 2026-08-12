import {
  CHARCOAL,
  CREAM,
  DEFAULT_FROM,
  DEFAULT_TO,
  MUTED,
  ORG,
  PHONE_1,
  PINK,
  SITE,
  esc,
  json,
  paragraphs,
  row,
  sendViaResend,
  shell,
} from "../_shared/email";

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


interface Payload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
  /** Hidden field — real people leave it empty, bots fill it in */
  company?: string;
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
