// Renders every printable handout in content/downloads/ to a PDF.
//
//   node scripts/build-pdfs.mjs
//
// Each .html file there is the source of truth for one download. Edit the HTML,
// re-run this, and commit both. Chromium is already present for the screenshot
// tooling, so there is no PDF library to install.

import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * Playwright is deliberately not a dependency of this repo. It pulls a browser
 * download, and Cloudflare would install it on every deploy for no reason —
 * the PDFs are committed, so the hosted build never renders one. It is an
 * authoring tool, resolved here from wherever it happens to be installed.
 *
 * Set PLAYWRIGHT_PATH if it lives somewhere this does not find.
 */
async function loadChromium() {
  const candidates = [];
  if (process.env.PLAYWRIGHT_PATH) candidates.push(process.env.PLAYWRIGHT_PATH);
  candidates.push('playwright');
  try {
    const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
    candidates.push(path.join(globalRoot, 'playwright'));
  } catch {
    // npm not on the path — the other candidates may still work.
  }

  const require = createRequire(import.meta.url);
  for (const candidate of candidates) {
    try {
      const resolved = require.resolve(candidate);
      const mod = await import(`file://${resolved}`);
      // Playwright ships as CommonJS, so an ESM import lands it under default.
      const chromium = mod.chromium ?? mod.default?.chromium;
      if (chromium) return chromium;
    } catch {
      // Try the next one.
    }
  }
  throw new Error(
    `Could not find playwright. Install it (npm i -g playwright) or set PLAYWRIGHT_PATH ` +
      `to its directory. Tried: ${candidates.join(', ')}`,
  );
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'content/downloads');
const outDir = path.join(root, 'artifacts/treasured-vessels-v2/public/downloads');

/** Source filename -> published filename, so the URLs stay stable and branded. */
const OUTPUT_NAMES = {
  'community-action-checklist.html': 'tvgc-community-action-checklist.pdf',
  'mens-commitment-card.html': 'tvgc-mens-commitment-card.pdf',
  'menstrual-dignity-check.html': 'tvgc-menstrual-dignity-check.pdf',
};

const sources = (await fs.readdir(sourceDir)).filter((f) => f.endsWith('.html')).sort();

const unnamed = sources.filter((f) => !OUTPUT_NAMES[f]);
if (unnamed.length) {
  // Better to stop than to publish a handout under a filename nobody chose.
  console.error(`No output name mapped for: ${unnamed.join(', ')}`);
  process.exit(1);
}

await fs.mkdir(outDir, { recursive: true });
const chromium = await loadChromium();
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
    : {}),
});

for (const source of sources) {
  const page = await browser.newPage();
  await page.goto(`file://${path.join(sourceDir, source)}`, { waitUntil: 'networkidle' });
  const out = path.join(outDir, OUTPUT_NAMES[source]);
  await page.pdf({
    path: out,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });
  await page.close();
  const { size } = await fs.stat(out);
  console.log(`  ${source} -> downloads/${OUTPUT_NAMES[source]}  ${Math.round(size / 1024)} kB`);
}

await browser.close();
