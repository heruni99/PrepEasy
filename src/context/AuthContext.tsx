import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { storageService } from '../services/storageService';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginAsGuest: () => void;
  loginWithEmail: (email: string, name?: string) => Promise<void>;
  signUpWithEmail: (email: string, name?: string) => Promise<void>;
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
  }, []);

  const loginAsGuest = () => {
    const guest: User = {
      id: 'guest-user',
      email: 'alex.student@prepeasy.edu',
      name: 'Alex Chen (Student Guest)',
      is_demo: true
    };
    storageService.setCurrentUser(guest);
    setUser(guest);
  };

  const loginWithEmail = async (email: string, name?: string) => {
    setIsLoading(true);
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password: 'demo-password' // standard demo login flow
        });
        if (!error && data.user) {
          const supabaseUser: User = {
            id: data.user.id,
            email: data.user.email || email,
            name: name || data.user.user_metadata?.full_name || email.split('@')[0],
            is_demo: false
          };
          setUser(supabaseUser);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase login failed, utilizing local mode', err);
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
  };

  const signUpWithEmail = async (email: string, name?: string) => {
    await loginWithEmail(email, name);
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
