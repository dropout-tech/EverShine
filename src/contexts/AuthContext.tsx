
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    loading: true,
    signOut: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        const stopWaiting = () => {
            if (active) setLoading(false);
        };
        // Auth must not hold the whole site behind a blank screen.
        const timeout = window.setTimeout(stopWaiting, 4000);

        if (!isSupabaseConfigured || !supabase) {
            stopWaiting();
            return () => {
                active = false;
                window.clearTimeout(timeout);
            };
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!active) return;
            setSession(session);
            setUser(session?.user ?? null);
            stopWaiting();
        }).catch(() => stopWaiting());

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!active) return;
            setSession(session);
            setUser(session?.user ?? null);
            stopWaiting();
        });

        return () => {
            active = false;
            window.clearTimeout(timeout);
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        if (!supabase) return;
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
