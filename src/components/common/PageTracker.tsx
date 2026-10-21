import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import { initAnalytics, trackPageView } from '../../lib/analytics';

const PageTracker = () => {
    const location = useLocation();
    const initialized = useRef(false);

    // Initialize Global Analytics Scripts once
    useEffect(() => {
        if (!initialized.current) {
            initAnalytics();
            initialized.current = true;
        }
    }, []);

    // Track Page Views on route change
    useEffect(() => {
        const track = async () => {
            // 1. External Tools (GA4, Pixel)
            trackPageView(location.pathname);

            // 2. Internal Supabase Page Views
            try {
                if (!isSupabaseConfigured || !supabase) return;
                await supabase.from('page_views').insert({
                    path: location.pathname,
                    user_agent: navigator.userAgent,
                });
            } catch {
                // Ignore errors
            }
        };

        track();
    }, [location]);

    return null;
};

export default PageTracker;
