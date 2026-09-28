import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { storageService } from '../services/storageService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AuthResponse {
  error: string | null;
  warning?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginAsGuest: () => void;
  loginWithEmail: (email: string, password?: string, name?: string) => Promise<AuthResponse>;
  signUpWithEmail: (email: string, password?: string, name?: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
              is_demo: false
            });
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.warn('Supabase auth session fetch error', err);
        }
      }

      // Fallback to local storage user / guest demo user
      const localUser = storageService.getCurrentUser();
      setUser(localUser);
      setIsLoading(false);
    };

    initAuth();

    if (isSupabaseConfigured && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u: User = {
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            is_demo: false
          };
          storageService.setCurrentUser(u);
          setUser(u);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const loginAsGuest = () => {
    const guest: User = {
      id: 'guest-user',
      email: 'guest@prepeasy.app',
      name: 'Guest Cook',
      is_demo: true
    };
    storageService.setCurrentUser(guest);
    setUser(guest);
  };

  const loginWithEmail = async (email: string, password?: string, name?: string): Promise<AuthResponse> => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: password || 'demo-password'
        });

        if (error) {
          // If email is not confirmed in Supabase due to free tier email limits
          if (error.message?.toLowerCase().includes('email not confirmed')) {
            console.warn('Email unconfirmed in Supabase, initiating local test session');
            const localUser: User = {
              id: `user-${Date.now()}`,
              email,
              name: name || email.split('@')[0],
              is_demo: false
            };
            storageService.setCurrentUser(localUser);
            setUser(localUser);
            setIsLoading(false);
            return {
              error: null,
              warning: 'Supabase email confirmation pending. Signed in via local session for testing.'
            };
          }

          setIsLoading(false);
          return { error: error.message };
        }

        if (data?.user) {
          const supabaseUser: User = {
            id: data.user.id,
            email: data.user.email || email,
            name: name || data.user.user_metadata?.full_name || email.split('@')[0],
            is_demo: false
          };
          storageService.setCurrentUser(supabaseUser);
          setUser(supabaseUser);
          setIsLoading(false);
          return { error: null };
        }
      } catch (err: any) {
        console.warn('Supabase login failed', err);
        setIsLoading(false);
        return { error: err.message || 'Supabase login failed' };
      }
    }

    // Local / Mock login fallback
    const localUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      is_demo: false
    };
    storageService.setCurrentUser(localUser);
    setUser(localUser);
    setIsLoading(false);
    return { error: null };
  };

  const signUpWithEmail = async (email: string, password?: string, name?: string): Promise<AuthResponse> => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: password || 'demo-password',
          options: {
            data: {
              full_name: name || email.split('@')[0],
            },
          },
        });

        if (error) {
          // Handle Supabase free tier email rate limits (HTTP 429) gracefully
          if (error.status === 429 || error.message?.toLowerCase().includes('rate limit')) {
            console.warn('Supabase email rate limit reached, falling back to local test session');
            const fallbackUser: User = {
              id: `user-${Date.now()}`,
              email,
              name: name || email.split('@')[0],
              is_demo: false
            };
            storageService.setCurrentUser(fallbackUser);
            setUser(fallbackUser);
            setIsLoading(false);
            return {
              error: null,
              warning: 'Supabase email rate limit reached (free tier allows 3/hr). Created active test session!'
            };
          }

          setIsLoading(false);
          return { error: error.message };
        }

        if (data?.user) {
          const supabaseUser: User = {
            id: data.user.id,
            email: data.user.email || email,
            name: name || data.user.user_metadata?.full_name || email.split('@')[0],
            is_demo: false
          };
          storageService.setCurrentUser(supabaseUser);
          setUser(supabaseUser);
          setIsLoading(false);
          return { error: null };
        }
      } catch (err: any) {
        console.warn('Supabase sign up error', err);
        // If network or rate limit failure, fallback locally
        const fallbackUser: User = {
          id: `user-${Date.now()}`,
          email,
          name: name || email.split('@')[0],
          is_demo: false
        };
        storageService.setCurrentUser(fallbackUser);
        setUser(fallbackUser);
        setIsLoading(false);
        return {
          error: null,
          warning: 'Signed in via local test session.'
        };
      }
    }

    // Fallback local sign up
    const localUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: name || email.split('@')[0],
      is_demo: false
    };
    storageService.setCurrentUser(localUser);
    setUser(localUser);
    setIsLoading(false);
    return { error: null };
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signout error', err);
      }
    }
    storageService.setCurrentUser(null);
    setUser(null);
    // Re-initialize guest demo for smooth experience
    loginAsGuest();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginAsGuest, loginWithEmail, signUpWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
