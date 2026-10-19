// Pure HTML transforms shared by server.js (Zeabur), scripts/prerender-routes.mjs
// and functions/index.js (Cloudflare Pages). No Node-only APIs here: the Pages
// Function bundles this file with esbuild.
import seoRoutes, { SITE_URL } from './seo-routes.js';

export function escapeAttr(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;');
}

export function replaceMetaContent(html, attrName, key, value) {
    const pattern = new RegExp(`(<meta ${attrName}="${key}" content=")[^"]*(")`);
    return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

export function injectSeoMeta(html, routePath) {
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

export const NOINDEX_ROUTES = ['/login', '/admin', '/member-edit'];

export function injectNoindex(html) {
    if (/<meta name="robots" content="[^"]*"/.test(html)) {
        return replaceMetaContent(html, 'name', 'robots', 'noindex, nofollow');
    }
    return html.replace(
        '</head>',
        '  <meta name="robots" content="noindex, nofollow" />\n</head>'
    );
}

export function stripHomeOnlySchema(html) {
    return html
        .replace(/<script type="application\/ld\+json" id="seo-faq"[\s\S]*?<\/script>\s*/g, '')
        .replace(/<script type="application\/ld\+json" id="seo-event"[\s\S]*?<\/script>\s*/g, '');
}

export function nextMeetingWindow(now = Date.now()) {
    const taipeiNow = new Date(now + 8 * 60 * 60 * 1000);
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

export function refreshEventDates(html, now = Date.now()) {
    const { start, end } = nextMeetingWindow(now);
    return html
        .replace(/"startDate": "[^"]+"/, `"startDate": "${start}"`)
        .replace(/"endDate": "[^"]+"/, `"endDate": "${end}"`);
}

export function injectBreadcrumb(html, breadcrumbs) {
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

export function normalizeRoute(routePath) {
    if (routePath.length > 1 && routePath.endsWith('/')) {
        return routePath.slice(0, -1);
    }
    return routePath;
}

export const NOINDEX_TITLES = {
    '/login': '會員登入｜BNI 長輝白金分會',
    '/admin': '管理後台｜BNI 長輝白金分會',
    '/member-edit': '編輯會員資料｜BNI 長輝白金分會',
};

export function applyRouteIdentity(html, route, title) {
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

/** Renders the SPA shell for one route. Runtime env injection is the caller's job. */
export function renderAppShell(indexHtml, routePath) {
    const route = normalizeRoute(routePath);
    let html = indexHtml;
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

    return { status, html };
}
