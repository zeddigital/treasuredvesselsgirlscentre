import { useEffect } from "react";

const SITE_NAME = "Treasured Vessels Girls' Centre";
const SITE_ORIGIN = "https://treasuredvesselsuganda.org";

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
  /** JSON-LD objects to publish in a single graph */
  schema?: Record<string, unknown>[];
}

const SCHEMA_ID = "tv-structured-data";

/**
 * Sets document title, meta description, canonical URL, Open Graph/Twitter tags
 * and JSON-LD for the current page. Tags are restored on unmount so pages don't
 * leak metadata into one another during client-side navigation.
 */
export function useSeo({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  schema,
}: SeoOptions) {
  useEffect(() => {
    const previousTitle = document.title;
    const url = `${SITE_ORIGIN}${path}`;
    const absoluteImage = image
      ? image.startsWith("http")
        ? image
        : `${SITE_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`
      : undefined;

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    if (keywords?.length) {
      setMeta('meta[name="keywords"]', "name", "keywords", keywords.join(", "));
    }
    setLink("canonical", url);

    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    if (absoluteImage) {
      setMeta('meta[property="og:image"]', "property", "og:image", absoluteImage);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", absoluteImage);
    }

    document.getElementById(SCHEMA_ID)?.remove();
    if (schema?.length) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = SCHEMA_ID;
      script.textContent = JSON.stringify(
        schema.length === 1 ? schema[0] : { "@context": "https://schema.org", "@graph": schema },
      );
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      document.getElementById(SCHEMA_ID)?.remove();
    };
  }, [title, description, path, image, type, keywords, schema]);
}

export { SITE_ORIGIN, SITE_NAME };
