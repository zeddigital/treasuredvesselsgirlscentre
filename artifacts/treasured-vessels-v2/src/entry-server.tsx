import { renderToString } from 'react-dom/server';

import App from './App';
import { resetSsrHead, takeSsrHead, type SeoHead } from '@/lib/seo';

export interface RenderResult {
  html: string;
  head: SeoHead | null;
}

/**
 * Renders one route to static HTML at build time. The same <App /> the browser
 * mounts is used, so the prerendered markup and the first client render agree
 * and React can hydrate rather than throw the page away.
 */
export function render(path: string): RenderResult {
  resetSsrHead();
  const html = renderToString(<App ssrPath={path} />);
  return { html, head: takeSsrHead() };
}
