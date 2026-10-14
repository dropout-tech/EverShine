import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../config/site.config';
import seoRoutes, { OG } from '../../../seo-routes.js';

interface BreadcrumbItem {
    name: string;
    path: string;
}

interface RouteSeo {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
    ogImageAlt: string;
    breadcrumbs?: BreadcrumbItem[];
}

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    noindex?: boolean;
    breadcrumbs?: BreadcrumbItem[];
    ogImage?: string;
    ogImageAlt?: string;
    structuredData?: object;
}

const SITE_URL = siteConfig.siteUrl;
const DEFAULT_TITLE = `${siteConfig.branchFullName}｜台灣線上商會・商務引薦`;
const SITE_NAME = `${siteConfig.branchFullName}｜台灣商會`;

const routes = seoRoutes as Record<string, RouteSeo>;

function toAbsoluteUrl(pathOrUrl: string) {
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${SITE_URL}${encodeURI(path)}`;
}

function setMetaTag(selector: string, attribute: string, value: string) {
    let el = document.querySelector(selector);
    if (el) {
        el.setAttribute(attribute, value);
    } else {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1) || [];
        if (attrName && attrValue) {
            el.setAttribute(attrName, attrValue);
        }
        el.setAttribute(attribute, value);
        document.head.appendChild(el);
    }
}

function setLinkTag(rel: string, href: string) {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (el) {
        el.setAttribute('href', href);
    } else {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        el.setAttribute('href', href);
        document.head.appendChild(el);
    }
}

function setHreflang(hreflang: string, href: string) {
    const selector = `link[rel="alternate"][hreflang="${hreflang}"]`;
    let el = document.querySelector(selector);
    if (el) {
        el.setAttribute('href', href);
    } else {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', hreflang);
        el.setAttribute('href', href);
        document.head.appendChild(el);
    }
}

function setOrRemoveMetaTag(selector: string, attribute: string, value: string | null) {
    const el = document.querySelector(selector);
    if (value) {
        if (el) {
            el.setAttribute(attribute, value);
        } else {
            const newEl = document.createElement('meta');
            const [attrName, attrValue] = selector.match(/\[(.+?)="(.+?)"\]/)?.slice(1) || [];
            if (attrName && attrValue) {
                newEl.setAttribute(attrName, attrValue);
            }
            newEl.setAttribute(attribute, value);
            document.head.appendChild(newEl);
        }
    } else {
        el?.remove();
    }
}

function removeBreadcrumbSchema() {
    document.querySelector('script[data-seo-breadcrumb]')?.remove();
    document.getElementById('seo-breadcrumb-ssr')?.remove();
}

function injectBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
    removeBreadcrumbSchema();
    if (breadcrumbs.length < 2) return;

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
        })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-breadcrumb', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

function injectStructuredData(data: object) {
    const existingScript = document.querySelector('script[data-seo-page]');
    existingScript?.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo-page', 'true');
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', ...data });
    document.head.appendChild(script);
}

function composeTitle(title: string) {
    if (title.includes(siteConfig.branchFullName)) return title;
    return `${title}｜${siteConfig.branchFullName}`;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    noindex = false,
    breadcrumbs,
    ogImage,
    ogImageAlt,
    structuredData,
}) => {
    const location = useLocation();
    const routeKey = location.pathname.length > 1 && location.pathname.endsWith('/')
        ? location.pathname.slice(0, -1)
        : location.pathname;
    const routeSeo = routes[routeKey];

    const fullTitle = title ? composeTitle(title) : (routeSeo?.title ?? DEFAULT_TITLE);
    const resolvedDescription = description ?? routeSeo?.description ?? (noindex ? '此頁面僅供會員使用，不會被搜尋引擎索引。' : '');
    const resolvedKeywords = keywords ?? routeSeo?.keywords ?? '';
    const pageUrl = routeSeo?.canonical ?? `${SITE_URL}${location.pathname}`;
    const imageUrl = toAbsoluteUrl(ogImage ?? routeSeo?.ogImage ?? siteConfig.ogImage);
    const imageAlt = ogImageAlt ?? routeSeo?.ogImageAlt ?? fullTitle;
    const resolvedBreadcrumbs = breadcrumbs ?? routeSeo?.breadcrumbs;
    const breadcrumbKey = JSON.stringify(resolvedBreadcrumbs ?? null);
    const structuredKey = JSON.stringify(structuredData ?? null);

    useEffect(() => {
        document.title = fullTitle;

        setLinkTag('canonical', pageUrl);
        setHreflang('zh-TW', pageUrl);
        setHreflang('x-default', pageUrl);

        if (resolvedDescription) {
            setMetaTag('meta[name="description"]', 'content', resolvedDescription);
            setMetaTag('meta[property="og:description"]', 'content', resolvedDescription);
            setMetaTag('meta[name="twitter:description"]', 'content', resolvedDescription);
        }

        if (resolvedKeywords) {
            setMetaTag('meta[name="keywords"]', 'content', resolvedKeywords);
        }

        setMetaTag('meta[property="og:type"]', 'content', 'website');
        setMetaTag('meta[property="og:locale"]', 'content', 'zh_TW');
        setMetaTag('meta[property="og:title"]', 'content', fullTitle);
        setMetaTag('meta[property="og:url"]', 'content', pageUrl);
        setMetaTag('meta[property="og:image"]', 'content', imageUrl);
        setMetaTag('meta[property="og:image:secure_url"]', 'content', imageUrl);
        setMetaTag('meta[property="og:image:type"]', 'content', OG.type);
        setMetaTag('meta[property="og:image:width"]', 'content', String(OG.width));
        setMetaTag('meta[property="og:image:height"]', 'content', String(OG.height));
        setMetaTag('meta[property="og:image:alt"]', 'content', imageAlt);
        setMetaTag('meta[property="og:site_name"]', 'content', SITE_NAME);

        setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
        setMetaTag('meta[name="twitter:title"]', 'content', fullTitle);
        setMetaTag('meta[name="twitter:url"]', 'content', pageUrl);
        setMetaTag('meta[name="twitter:image"]', 'content', imageUrl);
        setMetaTag('meta[name="twitter:image:alt"]', 'content', imageAlt);

        if (noindex) {
            setOrRemoveMetaTag('meta[name="robots"]', 'content', 'noindex, nofollow');
        } else {
            setOrRemoveMetaTag('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        }

        const crumbs = breadcrumbKey ? JSON.parse(breadcrumbKey) as BreadcrumbItem[] : null;
        if (crumbs && crumbs.length > 0) {
            injectBreadcrumbSchema(crumbs);
        } else {
            removeBreadcrumbSchema();
        }

        if (structuredKey) {
            injectStructuredData(JSON.parse(structuredKey) as object);
        }

        return () => {
            removeBreadcrumbSchema();
            document.querySelector('script[data-seo-page]')?.remove();
        };
    }, [fullTitle, resolvedDescription, resolvedKeywords, pageUrl, imageUrl, imageAlt, noindex, breadcrumbKey, structuredKey]);

    return null;
};

export default SEO;
