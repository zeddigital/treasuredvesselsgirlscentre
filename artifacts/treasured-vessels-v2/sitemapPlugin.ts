import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const SITE = 'https://treasuredvesselsuganda.org';

/** Pull `slug: "..."` values out of a source file, in order. */
function slugs(file: string): string[] {
  const src = fs.readFileSync(file, 'utf8');
  return [...src.matchAll(/slug:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
}

/**
 * Pull `slug` + `isoDate` pairs so posts carry an accurate lastmod.
 * Splits on each `slug:` and looks for an isoDate before the next one, so a
 * post without a date simply yields undefined rather than borrowing its
 * neighbour's.
 */
function slugsWithDates(file: string): Array<{ slug: string; date?: string }> {
  const src = fs.readFileSync(file, 'utf8');
  return [...src.matchAll(/slug:\s*"([a-z0-9-]+)"([\s\S]*?)(?=slug:\s*"|$)/g)].map((m) => ({
    slug: m[1],
    date: m[2].match(/isoDate:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1],
  }));
}

/**
 * No hero image may front more than this many articles. A blog that reuses the
 * same photograph across a run of posts reads as though nothing is happening,
 * and the drift is easy to miss one article at a time — so the build refuses it
 * rather than leaving it to be noticed later.
 */
const MAX_HERO_REUSE = 2;

function assertHeroVariety(file: string): void {
  const src = fs.readFileSync(file, 'utf8');
  const entries = [
    ...src.matchAll(/slug:\s*"([a-z0-9-]+)"[\s\S]*?image:\s*`\$\{import\.meta\.env\.BASE_URL\}([^`]+)`/g),
  ].map((m) => ({ slug: m[1], image: m[2] }));

  const byImage = new Map<string, string[]>();
  for (const { slug, image } of entries) {
    byImage.set(image, [...(byImage.get(image) ?? []), slug]);
  }

  const overused = [...byImage].filter(([, slugs]) => slugs.length > MAX_HERO_REUSE);
  if (overused.length) {
    const detail = overused
      .map(([image, slugs]) => `    ${image}\n      used by: ${slugs.join(', ')}`)
      .join('\n');
    throw new Error(
      `Hero images may front at most ${MAX_HERO_REUSE} articles. Over the limit:\n${detail}\n` +
        `  Give one of them a different image from public/images/gallery/.`,
    );
  }
}

function programIds(file: string): string[] {
  const src = fs.readFileSync(file, 'utf8');
  return [...src.matchAll(/id:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
}

interface Entry {
  loc: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

export function sitemap(): Plugin {
  let isSsrBuild = false;

  return {
    name: 'treasured-vessels-sitemap',
    apply: 'build',
    configResolved(config) {
      isSsrBuild = Boolean(config.build.ssr);
    },
    generateBundle() {
      // The build runs a second time to produce the Node bundle the
      // prerenderer imports; the sitemap belongs with the client output only.
      if (isSsrBuild) return;

      const src = path.resolve(import.meta.dirname, 'src');
      const today = new Date().toISOString().slice(0, 10);

      assertHeroVariety(path.join(src, 'lib/blog.ts'));

      const entries: Entry[] = [
        { loc: '/', changefreq: 'weekly', priority: '1.0' },
        { loc: '/about', changefreq: 'monthly', priority: '0.8' },
        { loc: '/about/founder', changefreq: 'yearly', priority: '0.6' },
        { loc: '/about/governance', changefreq: 'yearly', priority: '0.5' },
        { loc: '/about/faqs', changefreq: 'monthly', priority: '0.6' },
        { loc: '/programs', changefreq: 'monthly', priority: '0.9' },
        { loc: '/donate', changefreq: 'monthly', priority: '0.9' },
        { loc: '/impact', changefreq: 'monthly', priority: '0.7' },
        { loc: '/stories', changefreq: 'monthly', priority: '0.7' },
        { loc: '/blog', changefreq: 'weekly', priority: '0.9' },
        { loc: '/news', changefreq: 'weekly', priority: '0.7' },
        { loc: '/contact', changefreq: 'yearly', priority: '0.7' },
        { loc: '/get-involved/sponsor', changefreq: 'monthly', priority: '0.8' },
        { loc: '/get-involved/partner', changefreq: 'monthly', priority: '0.7' },
        { loc: '/get-involved/volunteer', changefreq: 'monthly', priority: '0.7' },
        { loc: '/policies/privacy', changefreq: 'yearly', priority: '0.3' },
      ];

      for (const id of programIds(path.join(src, 'pages/ProgramsOverview.tsx'))) {
        entries.push({ loc: `/programs/${id}`, changefreq: 'monthly', priority: '0.8' });
      }
      for (const { slug, date } of slugsWithDates(path.join(src, 'lib/blog.ts'))) {
        entries.push({ loc: `/blog/${slug}`, changefreq: 'monthly', priority: '0.8', lastmod: date });
      }
      for (const slug of slugs(path.join(src, 'lib/news.tsx'))) {
        entries.push({ loc: `/news/${slug}`, changefreq: 'monthly', priority: '0.6' });
      }

      const body = entries
        .map(({ loc, changefreq, priority, lastmod }) =>
          [
            '  <url>',
            `    <loc>${SITE}${loc}</loc>`,
            `    <lastmod>${lastmod ?? today}</lastmod>`,
            `    <changefreq>${changefreq}</changefreq>`,
            `    <priority>${priority}</priority>`,
            '  </url>',
          ].join('\n'),
        )
        .join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`,
      });

      console.log(`\n  sitemap.xml — ${entries.length} URLs`);
    },
  };
}
