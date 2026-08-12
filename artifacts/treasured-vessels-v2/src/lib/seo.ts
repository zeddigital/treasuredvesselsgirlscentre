import { useEffect, useMemo } from "react";

const SITE_NAME = "Treasured Vessels Girls' Centre";
const SITE_ORIGIN = "https://treasuredvesselsuganda.org";

/** Stable @id anchors so every page's graph references one organisation. */
export const ORG_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const LOGO_ID = `${SITE_ORIGIN}/#logo`;
export const ORG_IMAGE_ID = `${SITE_ORIGIN}/#primaryimage`;
/** Defined on /about/founder, referenced here — see that route's schema. */
export const FOUNDER_ID = `${SITE_ORIGIN}/about/founder#person`;
export const FOUNDER_IMAGE_ID = `${SITE_ORIGIN}/about/founder#primaryimage`;

const ORG_DESCRIPTION =
  "A registered, women-led community-based organisation in Jinja, Uganda, supporting vulnerable girls, teenage mothers and women through education, vocational training, menstrual health, protection and community outreach.";

/**
 * Organisation, WebSite and the organisation's primary image. Emitted on every
 * page so the whole site resolves to a single, consistent entity for search
 * engines; page-specific nodes are appended to the same @graph.
 */
function foundationGraph(): Record<string, unknown>[] {
  return [
    {
      "@type": ["Organization", "NGO"],
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: ["Treasured Vessels Girls Centre", "Treasured Vessels Uganda"],
      url: `${SITE_ORIGIN}/`,
      logo: {
        "@type": "ImageObject",
        "@id": LOGO_ID,
        url: `${SITE_ORIGIN}/images/logo.png`,
        contentUrl: `${SITE_ORIGIN}/images/logo.png`,
        caption: SITE_NAME,
      },
      image: { "@id": ORG_IMAGE_ID },
      description: ORG_DESCRIPTION,
      foundingDate: "2018",
      founder: { "@id": FOUNDER_ID },
      email: "mailto:treassuredvesselsug@gmail.com",
      telephone: ["+256756233041", "+256774427101"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jinja",
        addressRegion: "Jinja District",
        addressCountry: "UG",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Jinja District" },
        { "@type": "AdministrativeArea", name: "Busoga Sub-region" },
        { "@type": "Country", name: "Uganda" },
      ],
      knowsAbout: [
        "Girls' education",
        "Vocational skills training",
        "Teenage mother support",
        "Menstrual health and dignity",
        "Protection of vulnerable girls and women",
        "Community outreach",
      ],
      sameAs: [
        "https://www.facebook.com/p/Treasured-Vessels-Girls-Center-61577348832518/",
        "https://www.instagram.com/treasuredvesselsgirls/",
        "https://www.linkedin.com/in/racheal-achen-muggaga-912b4330a/",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "general enquiries",
        telephone: "+256756233041",
        email: "treassuredvesselsug@gmail.com",
        availableLanguage: ["English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_ORIGIN}/`,
      name: SITE_NAME,
      alternateName: "Treasured Vessels Uganda",
      description: `The official website of ${SITE_NAME} in Jinja, Uganda.`,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-UG",
    },
    {
      "@type": "ImageObject",
      "@id": ORG_IMAGE_ID,
      url: `${SITE_ORIGIN}/images/hero.jpg`,
      contentUrl: `${SITE_ORIGIN}/images/hero.jpg`,
      caption:
        "Treasured Vessels Girls' Centre supporting girls and women in Jinja, Uganda",
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
  /**
   * Trail below Home, which is prepended automatically. Emits a BreadcrumbList
   * and points the WebPage node at it.
   */
  breadcrumb?: Crumb[];
  /** Set only where a page has a meaningful, known last-edited date */
  dateModified?: string;
  /** Keeps a page out of the index (e.g. the 404 route) */
  noindex?: boolean;
}

export interface Crumb {
  name: string;
  /** Path beginning with "/" */
  path: string;
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
  breadcrumb,
  dateModified,
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

  // Home is always position 1; a page supplies only the trail below it.
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...(breadcrumb ?? [])];
  const breadcrumbNode = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_ORIGIN}${crumb.path}`,
    })),
  };

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
      : { "@id": ORG_IMAGE_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    ...(dateModified ? { dateModified } : {}),
    inLanguage: "en-UG",
    ...(webPage ?? {}),
  };

  return {
    title,
    canonical: url,
    metas,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        ...foundationGraph(),
        webPageNode,
        breadcrumbNode,
        ...(schema ?? []),
      ],
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
