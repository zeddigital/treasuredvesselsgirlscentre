import { useEffect, useMemo } from "react";

const SITE_NAME = "Treasured Vessels Girls' Centre";
const SITE_ORIGIN = "https://treasuredvesselsuganda.org";

/** Stable @id anchors so every page's graph references one organisation. */
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const LOGO_ID = `${SITE_ORIGIN}/#logo`;

const ORG_DESCRIPTION =
  "Treasured Vessels Girls' Centre is a women-led Christian community-based organisation in Jinja, Uganda, supporting vulnerable girls, teenage mothers and women through education, vocational training, menstrual dignity, protection and community outreach.";

/**
 * Organisation and WebSite nodes. Included on every page so the whole site
 * resolves to a single, consistent entity for search engines.
 */
function foundationGraph(): Record<string, unknown>[] {
  return [
    {
      "@type": "NGO",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: ["Treasured Vessels Girls' Centre Uganda", "Treasured Vessels"],
      url: `${SITE_ORIGIN}/`,
      logo: {
        "@type": "ImageObject",
        "@id": LOGO_ID,
        url: `${SITE_ORIGIN}/images/logo.png`,
        contentUrl: `${SITE_ORIGIN}/images/logo.png`,
        width: 512,
        height: 512,
        caption: SITE_NAME,
      },
      image: { "@id": LOGO_ID },
      description: ORG_DESCRIPTION,
      foundingDate: "2018",
      nonprofitStatus: "NonprofitType",
      areaServed: [
        { "@type": "Country", name: "Uganda" },
        { "@type": "AdministrativeArea", name: "Jinja District" },
        { "@type": "AdministrativeArea", name: "Busoga" },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Walukuba-Masese Road",
        addressLocality: "Jinja",
        addressRegion: "Jinja District",
        addressCountry: "UG",
      },
      email: "treassuredvesselsug@gmail.com",
      telephone: "+256756233041",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+256756233041",
          email: "treassuredvesselsug@gmail.com",
          contactType: "customer support",
          areaServed: "UG",
          availableLanguage: ["en"],
        },
        {
          "@type": "ContactPoint",
          telephone: "+256774427101",
          contactType: "customer support",
          areaServed: "UG",
          availableLanguage: ["en"],
        },
      ],
      founder: { "@type": "Person", name: "Racheal Muggaga Achen" },
      knowsAbout: [
        "Girls' education",
        "Women's empowerment",
        "Teenage mother support",
        "Menstrual health and dignity",
        "Gender-based violence support",
        "Vocational training",
        "Christian ministry",
        "Community development",
      ],
      sameAs: [
        "https://www.facebook.com/p/Treasured-Vessels-Girls-Center-61577348832518/",
        "https://www.instagram.com/treasuredvesselsgirls/",
        "https://www.linkedin.com/in/racheal-achen-muggaga-912b4330a/",
      ],
      potentialAction: {
        "@type": "DonateAction",
        name: "Donate to Treasured Vessels Girls' Centre",
        description:
          "Support the education, vocational training and protection of vulnerable girls and women in Jinja, Uganda.",
        recipient: { "@id": ORG_ID },
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_ORIGIN}/donate`,
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_ORIGIN}/`,
      name: SITE_NAME,
      description: `The official website of ${SITE_NAME}.`,
      publisher: { "@id": ORG_ID },
      inLanguage: "en",
    },
  ];
}

export interface SeoOptions {
  title: string;
  description: string;
  /** Path beginning with "/" — combined with the site origin for canonical/OG URLs */
  path: string;
  image?: string;
  type?: "website" | "article";
  keywords?: string[];
  /** Extra JSON-LD nodes appended to the foundation graph (e.g. BlogPosting) */
  schema?: Record<string, unknown>[];
  /** Overrides the default WebPage node type, e.g. "AboutPage", "ContactPage" */
  webPageType?: string;
  /** Merged into the WebPage node — lets a page point at its own breadcrumb, primary image, etc. */
  webPage?: Record<string, unknown>;
  /** Keeps a page out of the index (e.g. the 404 route) */
  noindex?: boolean;
}

export const SCHEMA_ID = "tv-structured-data";

export interface MetaTag {
  attr: "name" | "property";
  key: string;
  content: string;
}

/** Everything a page contributes to <head>, as plain data. */
export interface SeoHead {
  title: string;
  canonical: string;
  metas: MetaTag[];
  jsonLd: Record<string, unknown>;
}

/**
 * Pure: turns a page's SEO options into the head it needs. Kept free of any DOM
 * access so the prerenderer can call it at build time, where there is no
 * document — see prerender.mjs.
 */
export function buildSeoHead({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  schema,
  webPageType = "WebPage",
  webPage,
  noindex = false,
}: SeoOptions): SeoHead {
  const url = `${SITE_ORIGIN}${path}`;
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`
    : `${SITE_ORIGIN}/images/logo.png`;

  const metas: MetaTag[] = [
    { attr: "name", key: "description", content: description },
    { attr: "name", key: "robots", content: noindex ? "noindex, follow" : "index, follow" },
    { attr: "property", key: "og:title", content: title },
    { attr: "property", key: "og:description", content: description },
    { attr: "property", key: "og:type", content: type },
    { attr: "property", key: "og:url", content: url },
    { attr: "property", key: "og:site_name", content: SITE_NAME },
    { attr: "property", key: "og:image", content: absoluteImage },
    { attr: "name", key: "twitter:card", content: "summary_large_image" },
    { attr: "name", key: "twitter:title", content: title },
    { attr: "name", key: "twitter:description", content: description },
    { attr: "name", key: "twitter:image", content: absoluteImage },
  ];
  if (keywords?.length) {
    metas.push({ attr: "name", key: "keywords", content: keywords.join(", ") });
  }

  const webPageNode = {
    "@type": webPageType,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    primaryImageOfPage: image
      ? { "@type": "ImageObject", url: absoluteImage }
      : { "@id": LOGO_ID },
    inLanguage: "en",
    ...(webPage ?? {}),
  };

  return {
    title,
    canonical: url,
    metas,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [...foundationGraph(), webPageNode, ...(schema ?? [])],
    },
  };
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Writes a built head into the live document, replacing whatever is there. */
function applySeoHead(head: SeoHead) {
  document.title = head.title;
  for (const { attr, key, content } of head.metas) setMeta(attr, key, content);
  setLink("canonical", head.canonical);

  document.getElementById(SCHEMA_ID)?.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = SCHEMA_ID;
  script.textContent = JSON.stringify(head.jsonLd);
  document.head.appendChild(script);
}

// During prerendering there is no DOM and effects never run, so useSeo hands
// its head to the server renderer at render time instead. renderToString is
// synchronous and single-threaded, so one slot is enough.
let ssrHead: SeoHead | null = null;

export function resetSsrHead() {
  ssrHead = null;
}

export function takeSsrHead(): SeoHead | null {
  return ssrHead;
}

/**
 * Sets document title, meta description, canonical URL, Open Graph/Twitter tags
 * and JSON-LD for the current page. Every page publishes the organisation and
 * website nodes plus its own WebPage node, so the graph is consistent sitewide.
 */
export function useSeo(options: SeoOptions) {
  // Stringify so the head is only rebuilt when the values change, not on every
  // render just because the caller passed fresh object/array literals.
  const key = JSON.stringify(options);
  const head = useMemo(() => buildSeoHead(JSON.parse(key) as SeoOptions), [key]);

  if (typeof document === "undefined") ssrHead = head;

  useEffect(() => {
    applySeoHead(head);
    return () => {
      document.getElementById(SCHEMA_ID)?.remove();
    };
  }, [head]);
}

export { SITE_ORIGIN, SITE_NAME };
