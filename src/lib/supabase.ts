import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export interface EvershinePublicEnv {
    VITE_SUPABASE_URL?: string;
    VITE_SUPABASE_ANON_KEY?: string;
    VITE_CLAIM_PASSWORD?: string;
    VITE_TURNSTILE_SITE_KEY?: string;
    VITE_GA_ID?: string;
    VITE_FB_PIXEL_ID?: string;
    VITE_CLARITY_ID?: string;
}

function readRuntimeEnv(): EvershinePublicEnv {
    if (typeof window === 'undefined') return {};
    const runtime = (window as Window & { __EVERSHINE_ENV__?: EvershinePublicEnv }).__EVERSHINE_ENV__;
    return runtime && typeof runtime === 'object' ? runtime : {};
}

/** Build-time Vite values win. Runtime injection covers Docker builds that omitted them. */
export function publicEnv(name: keyof EvershinePublicEnv): string {
    const fromBuild = (import.meta.env as Record<string, string | undefined>)[name];
    const fromRuntime = readRuntimeEnv()[name];
    return (fromBuild || fromRuntime || '').trim();
}

const supabaseUrl = publicEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = publicEnv('VITE_SUPABASE_ANON_KEY');

export const isSupabaseConfigured = supabaseUrl.startsWith('http') && supabaseAnonKey.length > 20;

// Always export a client so authenticated screens can type-check.
// Public pages must check isSupabaseConfigured before calling it.
export const supabase: SupabaseClient = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient('https://placeholder.invalid', 'public-placeholder-not-configured');
