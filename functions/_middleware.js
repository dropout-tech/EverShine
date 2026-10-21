// Inject public env into every HTML response, same keys as server.js.
const PUBLIC_ENV_KEYS = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_CLAIM_PASSWORD',
    'VITE_TURNSTILE_SITE_KEY',
    'VITE_GA_ID',
    'VITE_FB_PIXEL_ID',
    'VITE_CLARITY_ID',
];

function injectRuntimeEnv(html, env) {
    const payloadObj = {};
    for (const key of PUBLIC_ENV_KEYS) {
        const value = env?.[key];
        if (typeof value === 'string' && value.trim()) payloadObj[key] = value.trim();
    }
    if (Object.keys(payloadObj).length === 0) return html;
    if (html.includes('window.__EVERSHINE_ENV__')) return html;
    const payload = JSON.stringify(payloadObj).replace(/</g, '\\u003c');
    const tag = `<script>window.__EVERSHINE_ENV__=${payload}</script>`;
    const marker = '<div id="root">';
    if (!html.includes(marker)) return html;
    return html.replace(marker, `${tag}\n  ${marker}`);
}

export async function onRequest(context) {
    const response = await context.next();
    const contentType = response.headers.get('Content-Type') || '';
    if (!response.ok || !contentType.includes('text/html')) return response;

    const html = injectRuntimeEnv(await response.text(), context.env || {});
    const headers = new Headers(response.headers);
    headers.delete('Content-Length');
    headers.delete('ETag');
    return new Response(html, { status: response.status, headers });
}
