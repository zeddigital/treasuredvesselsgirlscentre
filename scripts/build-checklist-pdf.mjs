// Regenerates the printable community action checklist.
//
//   node scripts/build-checklist-pdf.mjs
//
// Source of truth is content/downloads/community-action-checklist.html. Edit
// that, re-run this, and commit both. Chromium is already present in this
// project for the screenshot tooling, so there is no PDF library to install.

import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'content/downloads/community-action-checklist.html');
const out = path.join(
  root,
  'artifacts/treasured-vessels-v2/public/downloads/tvgc-community-action-checklist.pdf',
);

const browser = await chromium.launch({
  // Set PLAYWRIGHT_CHROMIUM_PATH where Chromium is not on the default path.
  ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {}),
});
const page = await browser.newPage();
await page.goto(`file://${source}`, { waitUntil: 'networkidle' });
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();
console.log(`wrote ${path.relative(root, out)}`);
