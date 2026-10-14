export interface SeoBreadcrumb {
    name: string;
    path: string;
}

export interface SeoRoute {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
    ogImageAlt: string;
    breadcrumbs?: SeoBreadcrumb[];
}

export const OG: {
    width: number;
    height: number;
    type: string;
};

export const SITE_URL: string;

declare const seoRoutes: Record<string, SeoRoute>;
export default seoRoutes;
