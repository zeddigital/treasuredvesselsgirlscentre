// Renders every route to static HTML after the Vite build.
//
// Without this the site is a single index.html that fills itself in with
// JavaScript: "view source" shows no title, no description and no JSON-LD, and
// crawlers that do not execute JS — Facebook, LinkedIn, X — see nothing but the
// shell. Prerendering writes a real HTML file per route with the head and the
// body baked in; React then hydrates it in the browser exactly as before.
//
// Routes come from the sitemap the build just emitted, so the pages that exist
// on disk and the pages advertised to search engines cannot drift apart.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_DIR = path.join(here, 'dist/public');
const SERVER_ENTRY = path.join(here, 'dist/server/entry-server.js');

/** Escapes a string for use in an HTML attribute value. */
function attr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Escapes text destined for an element's body. */
function text(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * JSON-LD sits inside a <script>, where the HTML parser ends the element at the
 * first "</script" regardless of JSON quoting — so that sequence has to be
 * broken up. Escaping the line separators keeps older parsers happy too.
 */
function jsonLd(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function renderHead(head) {
  const lines = [
    `<title>${text(head.title)}</title>`,
    ...head.metas.map(
      ({ attr: a, key, content }) => `<meta ${a}="${attr(key)}" content="${attr(content)}" />`,
    ),
    `<link rel="canonical" href="${attr(head.canonical)}" />`,
    `<script type="application/ld+json" id="tv-structured-data">${jsonLd(head.jsonLd)}</script>`,
  ];
  return lines.map((line) => `    ${line}`).join('\n');
}

/** Replaces the region between two HTML comment markers. */
function replaceRegion(html, name, replacement) {
  const start = html.indexOf(`<!--${name}-start-->`);
  const end = html.indexOf(`<!--${name}-end-->`);
  if (start === -1 || end === -1) {
    throw new Error(`index.html is missing its <!--${name}-start-->/<!--${name}-end--> markers`);
  }
  return html.slice(0, start) + replacement + html.slice(end + `<!--${name}-end-->`.length);
}

/** Every <loc> in the emitted sitemap, as site-relative paths. */
async function routesFromSitemap() {
  const xml = await fs.readFile(path.join(CLIENT_DIR, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return locs.map((loc) => new URL(loc).pathname);
}

/** `/` -> index.html, `/blog/x` -> blog/x/index.html */
function outputFile(route) {
  const clean = route.replace(/^\/+|\/+$/g, '');
  return clean ? path.join(CLIENT_DIR, clean, 'index.html') : path.join(CLIENT_DIR, 'index.html');
}

async function main() {
  const template = await fs.readFile(path.join(CLIENT_DIR, 'index.html'), 'utf8');
  const { render } = await import(SERVER_ENTRY);

  const routes = await routesFromSitemap();
  // Unmatched URLs are served this file, with a real 404 status. Pages treats a
  // project with no top-level 404.html as a single-page app and rewrites
  // everything to index.html instead, which would hide the prerendered pages.
  const targets = [...routes.map((route) => ({ route, file: outputFile(route) })), {
    route: '/404',
    file: path.join(CLIENT_DIR, '404.html'),
  }];

  const failures = [];
  for (const { route, file } of targets) {
    let html;
    try {
      const result = render(route);
      if (!result.head) throw new Error('the page did not call useSeo, so it has no head');
      html = replaceRegion(template, 'seo', `\n${renderHead(result.head)}\n    `);
      // The verification tag is homepage-only.
      if (route !== '/') html = replaceRegion(html, 'gsc', '');
      html = html.replace('<div id="root"></div>', `<div id="root">${result.html}</div>`);
    } catch (error) {
      failures.push(`${route}: ${error.message}`);
      continue;
    }
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, html);
  }

  if (failures.length) {
    // Shipping a half-prerendered site would silently leave some pages
    // invisible to crawlers, which is the problem this script exists to fix.
    console.error(`\n  prerender failed for ${failures.length} route(s):`);
    for (const failure of failures) console.error(`    ${failure}`);
    process.exit(1);
  }

  console.log(`\n  prerendered ${targets.length} pages (${routes.length} routes + 404.html)`);
}

await main();
