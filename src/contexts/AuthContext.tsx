import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  hasOfflineAccess: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const OFFLINE_ACCESS_KEY = 'jamb-offline-access';

function getOfflineAccessFlag() {
  try {
    return localStorage.getItem(OFFLINE_ACCESS_KEY) === 'true';
  } catch {
    return false;
  }
}

function setOfflineAccessFlag(value: boolean) {
  try {
    localStorage.setItem(OFFLINE_ACCESS_KEY, value ? 'true' : 'false');
  } catch {}
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasOfflineAccess, setHasOfflineAccess] = useState(getOfflineAccessFlag);

  useEffect(() => {
    const syncAuthState = (nextSession: Session | null) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (nextSession?.user) {
        setOfflineAccessFlag(true);
      }
      setHasOfflineAccess(Boolean(nextSession?.user) || (!navigator.onLine && getOfflineAccessFlag()));
      setLoading(false);
    };

    const fallbackTimer = window.setTimeout(() => {
      setHasOfflineAccess(!navigator.onLine && getOfflineAccessFlag());
      setLoading(false);
    }, 1500);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      window.clearTimeout(fallbackTimer);
      syncAuthState(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      window.clearTimeout(fallbackTimer);
      syncAuthState(session);
    }).catch(() => {
      window.clearTimeout(fallbackTimer);
      syncAuthState(null);
    });

    return () => {
      window.clearTimeout(fallbackTimer);
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleConnectionChange = () => {
      setHasOfflineAccess(Boolean(session?.user) || (!navigator.onLine && getOfflineAccessFlag()));
    };

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [session]);

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: name } },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setOfflineAccessFlag(true);
  };

  const signOut = async () => {
    setOfflineAccessFlag(false);
    setHasOfflineAccess(false);
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, hasOfflineAccess, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
