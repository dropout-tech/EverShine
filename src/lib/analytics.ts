
import { isSupabaseConfigured, supabase } from './supabase';

// Define the shape of our analytics configuration
interface AnalyticsConfig {
    gaId?: string;       // Google Analytics 4 Measurement ID (G-XXXXXXXXXX)
}

// Load config from environment variables
const config: AnalyticsConfig = {
    gaId: import.meta.env.VITE_GA_ID || 'G-NX3BWTYJQ0', // Fallback to provided ID
};

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

/**
 * Initialize all external tracking scripts (GA4)
 * This should be called once at the root of the app (e.g. in App.tsx or a Provider)
 */
export const initAnalytics = () => {
    // 1. Google Analytics 4
    if (config.gaId) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaId}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { window.dataLayer.push(arguments); }
        window.gtag('js', new Date());
        window.gtag('config', config.gaId);
        console.log(`✅ GA4 Initialized: ${config.gaId}`);
    }
};

/**
 * Track a specific event across all platforms + Internal Database
 * @param eventName Name of the event (e.g. 'click_line', 'view_member')
 * @param details Additional properties (e.g. { member_name: 'Alex' })
 */
export const trackEvent = async (eventName: string, details: any = {}) => {
    // 1. Send to GA4
    if (window.gtag) {
        window.gtag('event', eventName, details);
    }

    // 2. Send to Supabase (Internal High-Value Tracking)
    try {
        if (!isSupabaseConfigured || !supabase) return;
        await supabase.from('analytics_events').insert({
            event_name: eventName,
            event_data: details,
            user_agent: navigator.userAgent,
            path: window.location.pathname
        });
    } catch (error) {
        // Silent fail for analytics
    }
};

/**
 * Track a page view (Managed by PageTracker usually)
 */
export const trackPageView = (path: string) => {
    if (window.gtag && config.gaId) {
        window.gtag('config', config.gaId, { page_path: path });
    }
};
