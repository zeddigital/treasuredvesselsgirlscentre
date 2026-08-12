import { createRoot, hydrateRoot } from 'react-dom/client';

import App from './App';

import './index.css';

const container = document.getElementById('root')!;

// Routes are prerendered to static HTML at build time (see prerender.mjs), so
// in production there is already markup to hydrate. Fall back to a fresh
// render for the dev server, where the container is empty.
if (container.firstChild) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
