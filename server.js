import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import seoRoutes from './seo-routes.js';
import { renderAppShell as renderSeoShell } from './seo-render.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 8080;
const DIST = path.join(__dirname, 'dist');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const PRIMARY_SITE_URL = 'https://evershine.tw';

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

// 簡單字串轉義，避免使用者輸入的姓名/介紹字串破壞 HTML
function escapeHtml(str) {
    return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// /member/:slug 個別會員頁的 SEO 快取（避免每次 request 都打 Supabase）
const memberSeoCache = new Map(); // slug -> { html, expires }
const MEMBER_SEO_TTL_MS = 5 * 60 * 1000; // 5 分鐘

async function fetchMemberBySlug(slug) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
    const decoded = (() => {
        try { return decodeURIComponent(slug).trim(); } catch { return slug.trim(); }
    })();
    if (!decoded) return null;

    const headers = {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Accept': 'application/json',
    };

    const isNumericId = /^\d+$/.test(decoded);
    const baseQuery = `select=id,name,industry,company,position,shortIntro,fullIntro,photo,status&or=(status.is.null,status.eq.active)&limit=2`;

    try {
        let url;
        if (isNumericId) {
            url = `${SUPABASE_URL}/rest/v1/members?id=eq.${encodeURIComponent(decoded)}&${baseQuery}`;
        } else {
            url = `${SUPABASE_URL}/rest/v1/members?name=eq.${encodeURIComponent(decoded)}&${baseQuery}`;
        }
        const res = await fetch(url, { headers });
        if (!res.ok) return null;
        const arr = await res.json();
        const m = Array.isArray(arr) && arr.length === 1 ? arr[0] : null;
        if (!m) return null;
        if (m.status && m.status !== 'active') return null;
        return m;
    } catch (e) {
        console.warn('[member-seo] supabase fetch failed:', e?.message || e);
        return null;
    }
}

function buildMemberSeoMeta(member) {
    const name = escapeHtml(member.name || '');
    const industry = escapeHtml(member.industry || '');
    const company = escapeHtml(member.company || '');
    const positionRaw = member.position || member.title || '';
    const position = escapeHtml(positionRaw);

    const introRaw = (member.shortIntro || member.fullIntro || '')
        .replace(/\\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const introTrimmed = introRaw.length > 180 ? introRaw.slice(0, 180) + '…' : introRaw;
    const description = escapeHtml(
        introTrimmed || `${member.name}｜${member.industry || ''}｜${member.company || ''} — BNI 長輝白金分會會員。`
    );

    const title = `${name}｜${industry || '會員'}｜BNI 長輝白金分會`;
    const slug = String(member.id);
    const canonical = `${PRIMARY_SITE_URL}/member/${slug}`;
    const keywords = [name, industry, company, position, 'BNI', 'BNI 長輝白金分會'].filter(Boolean).join(', ');

    return { title, description, canonical, keywords };
}

function applyMemberSeoMeta(html, meta) {
    let result = html;
    result = result.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
    result = result.replace(/<meta name="description" content="[^"]*"/, `<meta name="description" content="${meta.description}"`);
    result = result.replace(/<meta name="keywords" content="[^"]*"/, `<meta name="keywords" content="${meta.keywords}"`);
    result = result.replace(/<link rel="canonical" href="[^"]*"/, `<link rel="canonical" href="${meta.canonical}"`);
    result = result.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${meta.canonical}"`);
    result = result.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${meta.title}"`);
    result = result.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${meta.description}"`);
    result = result.replace(/<meta name="twitter:url" content="[^"]*"/, `<meta name="twitter:url" content="${meta.canonical}"`);
    result = result.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${meta.title}"`);
    result = result.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${meta.description}"`);
    return result;
}

async function getMemberSeoHtml(slug) {
    const cached = memberSeoCache.get(slug);
    if (cached && cached.expires > Date.now()) return cached.html;

    const member = await fetchMemberBySlug(slug);
    if (!member) return null;
    const meta = buildMemberSeoMeta(member);
    const html = applyMemberSeoMeta(indexHtmlCache, meta);
    memberSeoCache.set(slug, { html, expires: Date.now() + MEMBER_SEO_TTL_MS });
    return html;
}

function injectSeoMeta(html, routePath) {
    const seo = seoRoutes[routePath];
    if (!seo) return html;

    let result = html;

    result = result.replace(
        /<title>[^<]*<\/title>/,
        `<title>${seo.title}</title>`
    );

    result = result.replace(
        /<meta name="description" content="[^"]*"/,
        `<meta name="description" content="${seo.description}"`
    );

    result = result.replace(
        /<meta name="keywords" content="[^"]*"/,
        `<meta name="keywords" content="${seo.keywords}"`
    );

    result = result.replace(
        /<link rel="canonical" href="[^"]*"/,
        `<link rel="canonical" href="${seo.canonical}"`
    );

    result = result.replace(
        /<meta property="og:url" content="[^"]*"/,
        `<meta property="og:url" content="${seo.canonical}"`
    );

    result = result.replace(
        /<meta property="og:title" content="[^"]*"/,
        `<meta property="og:title" content="${seo.title}"`
    );

    result = result.replace(
        /<meta property="og:description" content="[^"]*"/,
        `<meta property="og:description" content="${seo.description}"`
    );

    result = result.replace(
        /<meta name="twitter:url" content="[^"]*"/,
        `<meta name="twitter:url" content="${seo.canonical}"`
    );

    result = result.replace(
        /<meta name="twitter:title" content="[^"]*"/,
        `<meta name="twitter:title" content="${seo.title}"`
    );

    result = result.replace(
        /<meta name="twitter:description" content="[^"]*"/,
        `<meta name="twitter:description" content="${seo.description}"`
    );

    return result;
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

// 正式品牌域名：用於 HTTP→HTTPS 與非品牌域名的標準化 redirect
const PRIMARY_HOST = 'evershine.tw';
// 允許不重新導向（仍視為 HTTPS）的內部網域，避免 Zeabur 健康檢查或內部呼叫被誤導
const ALLOWED_INTERNAL_HOSTS = new Set([
    'localhost',
    '127.0.0.1',
]);

function isHttpsRequest(req) {
    // Zeabur / Cloudflare / 一般反向代理會用 x-forwarded-proto 帶原始協定
    const xfp = (req.headers['x-forwarded-proto'] || '').split(',')[0].trim().toLowerCase();
    if (xfp) return xfp === 'https';
    // node http server 沒走 TLS 時 socket.encrypted 會是 undefined
    return Boolean(req.socket && req.socket.encrypted);
}

function applySecurityHeaders(res) {
    // 強制 HTTPS（瀏覽器一年內自動把 http 升級為 https）。
    // 注意：HSTS 一旦下發很難撤回；先用 1 年但 preload 不開，安全可控。
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    // 防點擊劫持（不允許他站 iframe 嵌入本站）
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    // 防 MIME sniffing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    // 跨站來源政策：對外連結僅送出 origin（不漏路徑）
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // 預設關閉危險瀏覽器 API；如未來要用相機/位置可在前端 request 時再 prompt
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
}

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);

    // 1) 強制 HTTPS：若上游是 http 一律 301 redirect 到 https://evershine.tw 對應路徑
    const hostHeader = (req.headers.host || '').toLowerCase().split(':')[0];
    const isInternal = ALLOWED_INTERNAL_HOSTS.has(hostHeader);
    if (!isInternal && !isHttpsRequest(req)) {
        const targetHost = hostHeader || PRIMARY_HOST;
        res.writeHead(301, {
            Location: `https://${targetHost}${req.url}`,
            'Cache-Control': 'no-cache',
        });
        res.end();
        return;
    }

    // 2) 為所有回應加上安全 headers
    applySecurityHeaders(res);

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

    let filePath;
    let extname = path.extname(requestPath);

    if (requestPath.startsWith('/images/') || requestPath.startsWith('/data/')) {
        filePath = path.join(__dirname, 'public', requestPath);
    } else if (!extname) {
        const routePath = requestPath;
        let html = indexHtmlCache;

        if (NOINDEX_ROUTES.some(r => routePath.startsWith(r))) {
            html = injectNoindex(html);
            res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
            res.end(html);
            return;
        }

        // /member/:slug → 動態抓 Supabase 注入個別會員 SEO
        const memberMatch = routePath.match(/^\/member\/([^/]+)\/?$/);
        if (memberMatch) {
            const slug = memberMatch[1];
            getMemberSeoHtml(slug)
                .then((customHtml) => {
                    const finalHtml = customHtml || injectSeoMeta(indexHtmlCache, '/members');
                    res.writeHead(customHtml ? 200 : 200, {
                        'Content-Type': 'text/html',
                        'Cache-Control': customHtml ? 'public, max-age=300' : 'no-cache',
                    });
                    res.end(finalHtml);
                })
                .catch(() => {
                    res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
                    res.end(injectSeoMeta(indexHtmlCache, '/members'));
                });
            return;
        }

        html = injectSeoMeta(html, routePath);
        res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
        res.end(html);
        return;
    } else if (requestPath === '/index.html') {
        const html = injectSeoMeta(indexHtmlCache, '/');
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache'
        });
        res.end(html);
        return;
    } else {
        filePath = path.join(DIST, requestPath);
    }

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
