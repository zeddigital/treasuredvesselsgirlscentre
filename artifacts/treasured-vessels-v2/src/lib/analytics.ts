import { useEffect } from "react";
import { useLocation } from "wouter";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = "G-QF0S5MP1GH";

/**
 * Sends a GA4 page_view for the current route.
 *
 * gtag is configured with `send_page_view: false` in index.html because this
 * is a single-page app: gtag fires its automatic page_view once on load and
 * never again, so every client-side navigation would go unrecorded. Sending
 * them here keeps one page_view per route change, with no double count on the
 * initial load.
 */
export function usePageViews() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [location]);
}

/** Fire-and-forget custom event helper, safe when gtag is blocked or absent. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
