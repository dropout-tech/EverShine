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

console.log('Starting simple node server (v2.0 - SEO Enhanced, release 2026-10-16-perf)...');
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

function renderAppShell(routePath) {
    const rendered = renderSeoShell(indexHtmlCache, routePath);
    return { status: rendered.status, html: injectRuntimeEnv(rendered.html) };
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
