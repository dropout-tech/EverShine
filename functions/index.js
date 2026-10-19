// Cloudflare Pages Function for `/` only. dist/index.html is prerendered at build time;
// this moves the weekly meeting's startDate/endDate to the next Wednesday per request,
// matching server.js. Other routes are plain static files (see scripts/prerender-routes.mjs).
import { refreshEventDates } from '../seo-render.js';

export async function onRequestGet({ request, next }) {
    // Fetch the asset by URL alone: forwarding If-None-Match could yield a bodiless 304.
    const res = await next(request.url);
    const contentType = res.headers.get('Content-Type') || '';
    if (!res.ok || !contentType.includes('text/html')) return res;

    const html = refreshEventDates(await res.text());
    const headers = new Headers(res.headers);
    headers.set('Content-Type', 'text/html; charset=utf-8');
    headers.set('Cache-Control', 'no-cache');
    // The asset ETag/length describe the static file, not this body.
    headers.delete('ETag');
    headers.delete('Content-Length');
    return new Response(html, { status: res.status, headers });
}
