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

// Public anon connection for this project. Runtime and build env override it.
const PUBLIC_SUPABASE_FALLBACK: Pick<EvershinePublicEnv, 'VITE_SUPABASE_URL' | 'VITE_SUPABASE_ANON_KEY'> = {
    VITE_SUPABASE_URL: 'https://bapwzqmlvwwmnucjimsn.supabase.co',
    VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcHd6cW1sdnd3bW51Y2ppbXNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4OTY3NzgsImV4cCI6MjA4MTQ3Mjc3OH0.lGgudUHGUb14wt-N_fyLSgaML9-DPG4qeHJ5npsRUDQ',
};

/** Runtime env, then the Vite build, then the public project fallback. */
export function publicEnv(name: keyof EvershinePublicEnv): string {
    const fromBuild = (import.meta.env as Record<string, string | undefined>)[name];
    const fromRuntime = readRuntimeEnv()[name];
    const fromFallback = PUBLIC_SUPABASE_FALLBACK[name as keyof typeof PUBLIC_SUPABASE_FALLBACK];
    return (fromRuntime || fromBuild || fromFallback || '').trim();
}

const supabaseUrl = publicEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = publicEnv('VITE_SUPABASE_ANON_KEY');

export const isSupabaseConfigured = supabaseUrl.startsWith('http') && supabaseAnonKey.length > 20;

// Always export a client so authenticated screens can type-check.
// Public pages must check isSupabaseConfigured before calling it.
export const supabase: SupabaseClient = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient('https://placeholder.invalid', 'public-placeholder-not-configured');
