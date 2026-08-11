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

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
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
  /** Keeps a page out of the index (e.g. the 404 route) */
  noindex?: boolean;
}

const SCHEMA_ID = "tv-structured-data";

/**
 * Sets document title, meta description, canonical URL, Open Graph/Twitter tags
 * and JSON-LD for the current page. Every page publishes the organisation and
 * website nodes plus its own WebPage node, so the graph is consistent sitewide.
 */
export function useSeo({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  schema,
  webPageType = "WebPage",
  noindex = false,
}: SeoOptions) {
  // Stringify the variable parts so the effect doesn't re-run on every render
  // just because the caller passed new array/object literals.
  const schemaKey = useMemo(() => JSON.stringify(schema ?? null), [schema]);
  const keywordsKey = useMemo(() => JSON.stringify(keywords ?? null), [keywords]);

  useEffect(() => {
    const url = `${SITE_ORIGIN}${path}`;
    const absoluteImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`
      : `${SITE_ORIGIN}/images/logo.png`;

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noindex ? "noindex, follow" : "index, follow",
    );
    const kw: string[] | null = JSON.parse(keywordsKey);
    if (kw?.length) setMeta('meta[name="keywords"]', "name", "keywords", kw.join(", "));
    setLink("canonical", url);

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    setMeta('meta[property="og:image"]', "property", "og:image", absoluteImage);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", absoluteImage);

    const extra: Record<string, unknown>[] = JSON.parse(schemaKey) ?? [];
    const webPage = {
      "@type": webPageType,
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      primaryImageOfPage: image ? { "@type": "ImageObject", url: absoluteImage } : { "@id": LOGO_ID },
      inLanguage: "en",
    };

    document.getElementById(SCHEMA_ID)?.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = SCHEMA_ID;
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [...foundationGraph(), webPage, ...extra],
    });
    document.head.appendChild(script);

    return () => {
      document.getElementById(SCHEMA_ID)?.remove();
    };
  }, [title, description, path, image, type, keywordsKey, schemaKey, webPageType, noindex]);
}

export { SITE_ORIGIN, SITE_NAME };
