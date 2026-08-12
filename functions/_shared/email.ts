/**
 * Shared email plumbing for the Pages Functions.
 *
 * Lives under functions/_shared/ because Cloudflare Pages does not route paths
 * whose segments begin with an underscore, so this is importable but not
 * reachable over HTTP.
 */

export const SITE = "https://treasuredvesselsuganda.org";
export const ORG = "Treasured Vessels Girls' Centre";
export const PHONE_1 = "+256 756 233 041";
export const PHONE_2 = "+256 774 427 101";
export const DEFAULT_TO = "treasuredvesselsug@gmail.com";
export const DEFAULT_FROM =
  "Treasured Vessels Girls' Centre <noreply@treasuredvesselsuganda.org>";

// Brand palette
export const PLUM = "#552050";
export const PINK = "#E43F8C";
export const CREAM = "#FFF8F0";
export const CHARCOAL = "#25222B";
export const MUTED = "#6b6672";

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

/** Escape user input before it goes anywhere near an HTML email. */
export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
/** Preserve the enquirer's line breaks in HTML. */
export function paragraphs(text: string): string {
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
export function shell(opts: { preheader: string; heading: string; body: string }): string {
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
export function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid #EFE6EC;color:${MUTED};font-size:13px;width:104px;vertical-align:top;">${esc(
      label,
    )}</td>
    <td style="padding:9px 0;border-bottom:1px solid #EFE6EC;color:${CHARCOAL};font-size:15px;">${value}</td>
  </tr>`;
}
export async function sendViaResend(apiKey: string, payload: Record<string, unknown>) {
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
