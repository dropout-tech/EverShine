import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import seoRoutes, { SITE_URL } from './seo-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;
const DIST = path.join(__dirname, 'dist');

console.log('Starting simple node server (v2.0 - SEO Enhanced)...');
console.log(`PORT: ${PORT}`);
console.log(`DIST directory: ${DIST}`);

if (!fs.existsSync(DIST)) {
    console.error('CRITICAL ERROR: DIST folder not found! Build process failed or output directory is wrong.');
    console.log('Current directory contents:', fs.readdirSync(__dirname));
    process.exit(1);
}

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.xml': 'application/xml',
    '.txt': 'text/plain'
};

const indexHtmlCache = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');

function escapeAttr(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;');
}

function replaceMetaContent(html, attrName, key, value) {
    const pattern = new RegExp(`(<meta ${attrName}="${key}" content=")[^"]*(")`);
    return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

function injectSeoMeta(html, routePath) {
    const seo = seoRoutes[routePath];
    if (!seo) return html;

    let result = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(seo.title)}</title>`);
    result = replaceMetaContent(result, 'name', 'description', seo.description);
    result = replaceMetaContent(result, 'name', 'keywords', seo.keywords);
    result = replaceMetaContent(result, 'property', 'og:title', seo.title);
    result = replaceMetaContent(result, 'property', 'og:description', seo.description);
    result = replaceMetaContent(result, 'property', 'og:url', seo.canonical);
    result = replaceMetaContent(result, 'property', 'og:image', seo.ogImage);
    result = replaceMetaContent(result, 'property', 'og:image:secure_url', seo.ogImage);
    result = replaceMetaContent(result, 'property', 'og:image:alt', seo.ogImageAlt);
    result = replaceMetaContent(result, 'name', 'twitter:title', seo.title);
    result = replaceMetaContent(result, 'name', 'twitter:description', seo.description);
    result = replaceMetaContent(result, 'name', 'twitter:url', seo.canonical);
    result = replaceMetaContent(result, 'name', 'twitter:image', seo.ogImage);
    result = replaceMetaContent(result, 'name', 'twitter:image:alt', seo.ogImageAlt);
    result = result.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${seo.canonical}"`);
    result = result.replace(/<link rel="alternate" hreflang="zh-TW" href="[^"]*"/, `<link rel="alternate" hreflang="zh-TW" href="${seo.canonical}"`);
    result = result.replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"/, `<link rel="alternate" hreflang="x-default" href="${seo.canonical}"`);
    return result;
}

const NOINDEX_ROUTES = ['/login', '/admin', '/member-edit'];

function injectNoindex(html) {
    if (/<meta name="robots" content="[^"]*"/.test(html)) {
        return replaceMetaContent(html, 'name', 'robots', 'noindex, nofollow');
    }
    return html.replace(
        '</head>',
        '  <meta name="robots" content="noindex, nofollow" />\n</head>'
    );
}

function stripHomeOnlySchema(html) {
    return html
        .replace(/<script type="application\/ld\+json" id="seo-faq"[\s\S]*?<\/script>\s*/g, '')
        .replace(/<script type="application\/ld\+json" id="seo-event"[\s\S]*?<\/script>\s*/g, '');
}

function nextMeetingWindow() {
    const taipeiNow = new Date(Date.now() + 8 * 60 * 60 * 1000);
    const day = taipeiNow.getUTCDay();
    let addDays = (3 - day + 7) % 7;
    const minutes = taipeiNow.getUTCHours() * 60 + taipeiNow.getUTCMinutes();
    if (addDays === 0 && minutes >= 8 * 60 + 30) addDays = 7;
    const target = new Date(taipeiNow.getTime() + addDays * 24 * 60 * 60 * 1000);
    const date = [
        target.getUTCFullYear(),
        String(target.getUTCMonth() + 1).padStart(2, '0'),
        String(target.getUTCDate()).padStart(2, '0'),
    ].join('-');
    return {
        start: `${date}T06:30:00+08:00`,
        end: `${date}T08:30:00+08:00`,
    };
}

function refreshEventDates(html) {
    const { start, end } = nextMeetingWindow();
    return html
        .replace(/"startDate": "[^"]+"/, `"startDate": "${start}"`)
        .replace(/"endDate": "[^"]+"/, `"endDate": "${end}"`);
}

function injectBreadcrumb(html, breadcrumbs) {
    if (!breadcrumbs || breadcrumbs.length < 2) return html;
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${item.path}`,
        })),
    };
    const tag = `<script type="application/ld+json" id="seo-breadcrumb-ssr">${JSON.stringify(schema)}</script>\n`;
    return html.replace('</head>', `${tag}</head>`);
}

function normalizeRoute(routePath) {
    if (routePath.length > 1 && routePath.endsWith('/')) {
        return routePath.slice(0, -1);
    }
    return routePath;
}

const NOINDEX_TITLES = {
    '/login': '會員登入｜BNI 長輝白金分會',
    '/admin': '管理後台｜BNI 長輝白金分會',
    '/member-edit': '編輯會員資料｜BNI 長輝白金分會',
};

function applyRouteIdentity(html, route, title) {
    const canonical = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    let result = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
    result = replaceMetaContent(result, 'property', 'og:title', title);
    result = replaceMetaContent(result, 'name', 'twitter:title', title);
    result = replaceMetaContent(result, 'property', 'og:url', canonical);
    result = replaceMetaContent(result, 'name', 'twitter:url', canonical);
    result = result.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${canonical}"`);
    result = result.replace(/<link rel="alternate" hreflang="zh-TW" href="[^"]*"/, `<link rel="alternate" hreflang="zh-TW" href="${canonical}"`);
    result = result.replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"/, `<link rel="alternate" hreflang="x-default" href="${canonical}"`);
    return result;
}

function renderAppShell(routePath) {
    const route = normalizeRoute(routePath);
    let html = indexHtmlCache;
    let status = 200;

    if (NOINDEX_ROUTES.includes(route)) {
        const title = NOINDEX_TITLES[route] || 'BNI 長輝白金分會';
        html = injectNoindex(html);
        html = applyRouteIdentity(html, route, title);
        html = replaceMetaContent(html, 'name', 'description', '此頁面僅供會員使用，不會被搜尋引擎索引。');
        html = replaceMetaContent(html, 'property', 'og:description', '此頁面僅供會員使用。');
        html = replaceMetaContent(html, 'name', 'twitter:description', '此頁面僅供會員使用。');
        html = stripHomeOnlySchema(html);
    } else if (seoRoutes[route]) {
        html = injectSeoMeta(html, route);
        html = injectBreadcrumb(html, seoRoutes[route].breadcrumbs);
        html = route === '/' ? refreshEventDates(html) : stripHomeOnlySchema(html);
    } else {
        status = 404;
        html = injectNoindex(html);
        html = applyRouteIdentity(html, route, '找不到頁面｜BNI 長輝白金分會');
        const missing = '找不到這個頁面。請回到 BNI 長輝白金分會首頁，查看商會介紹、會員名錄與引薦案例。';
        html = replaceMetaContent(html, 'name', 'description', missing);
        html = replaceMetaContent(html, 'property', 'og:description', missing);
        html = replaceMetaContent(html, 'name', 'twitter:description', missing);
        html = stripHomeOnlySchema(html);
    }

    return { status, html: injectRuntimeEnv(html) };
}

const PUBLIC_ENV_KEYS = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_CLAIM_PASSWORD',
    'VITE_TURNSTILE_SITE_KEY',
    'VITE_GA_ID',
    'VITE_FB_PIXEL_ID',
    'VITE_CLARITY_ID',
];

function injectRuntimeEnv(html) {
    const env = {};
    for (const key of PUBLIC_ENV_KEYS) {
        const value = process.env[key];
        if (typeof value === 'string' && value.trim()) env[key] = value.trim();
    }
    const payload = JSON.stringify(env).replace(/</g, '\\u003c');
    const tag = `<script>window.__EVERSHINE_ENV__=${payload}</script>`;
    if (html.includes('window.__EVERSHINE_ENV__')) return html;
    return html.replace('<div id="root">', `${tag}\n  <div id="root">`);
}

function sendHtml(res, status, html) {
    res.writeHead(status, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
    });
    res.end(html);
}

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    let requestPath = decodeURIComponent(req.url.split('?')[0]);

    if (requestPath === '/index.html' || requestPath === '/' || !path.extname(requestPath)) {
        const rendered = renderAppShell(requestPath === '/index.html' ? '/' : requestPath);
        sendHtml(res, rendered.status, rendered.html);
        return;
    }

    const extname = path.extname(requestPath);
    const filePath = requestPath.startsWith('/images/') || requestPath.startsWith('/data/')
        ? path.join(__dirname, 'public', requestPath)
        : path.join(DIST, requestPath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                console.error(`404 Not Found: ${requestPath}`);
                res.writeHead(404);
                res.end(`File not found: ${requestPath}`);
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            const contentType = mimeTypes[extname] || 'application/octet-stream';

            if (requestPath.startsWith('/images/')) {
                res.setHeader('Cache-Control', 'public, max-age=604800, immutable');
            } else if (extname === '.css' || extname === '.js') {
                res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            } else {
                res.setHeader('Cache-Control', 'no-cache');
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully started on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Serving Static Files from: ${DIST}`);
    console.log(`SEO routes configured: ${Object.keys(seoRoutes).join(', ')}`);
    console.log('Ready to handle requests!');
});
