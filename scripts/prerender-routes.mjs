// Runs after `vite build`. Writes one HTML file per known route so static hosting
// (Cloudflare Pages) serves the same <head> that server.js renders per request.
//   dist/index.html  ← home (event dates refreshed again at request time by functions/index.js)
//   dist/<route>.html ← other SEO routes and noindex routes (served at /<route>, no trailing slash)
//   dist/404.html     ← unknown paths (Pages answers them with status 404)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import seoRoutes from '../seo-routes.js';
import { NOINDEX_ROUTES, renderAppShell } from '../seo-render.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '..', 'dist');
const NOT_FOUND_ROUTE = '/404';

// dist/index.html is rewritten below; running twice would render from the home page
// instead of the Vite template. `vite build` empties dist, so 404.html marks a second run.
if (fs.existsSync(path.join(DIST, '404.html'))) {
    throw new Error('prerender: dist already prerendered; run `vite build` first');
}

// Read the Vite template once; every route renders from this untouched copy.
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

function write(fileName, html) {
    fs.writeFileSync(path.join(DIST, fileName), html);
    console.log(`prerender: dist/${fileName}`);
}

const routes = [...Object.keys(seoRoutes), ...NOINDEX_ROUTES];
const outputs = [];

for (const route of routes) {
    const { status, html } = renderAppShell(template, route);
    if (status !== 200) throw new Error(`prerender: ${route} rendered status ${status}`);
    outputs.push([route === '/' ? 'index.html' : `${route.slice(1)}.html`, html]);
}

const notFound = renderAppShell(template, NOT_FOUND_ROUTE);
if (notFound.status !== 404) throw new Error(`prerender: ${NOT_FOUND_ROUTE} should render 404`);
outputs.push(['404.html', notFound.html]);

for (const [fileName, html] of outputs) write(fileName, html);
