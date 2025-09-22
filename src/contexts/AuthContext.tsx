import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // In a real app, you'd fetch user profile from your users table
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: 'citizen', // Default role, would be fetched from profile
          name: session.user.user_metadata?.name || 'User',
          region: session.user.user_metadata?.region || 'Unknown',
          created_at: session.user.created_at
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          role: 'citizen',
          name: session.user.user_metadata?.name || 'User',
          region: session.user.user_metadata?.region || 'Unknown',
          created_at: session.user.created_at
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Skip authentication if using placeholder Supabase config
    if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
      // Mock successful sign in for demo purposes
      setUser({
        id: 'demo-user',
        email,
        role: 'citizen',
        name: 'Demo User',
        region: 'Coastal Zone A',
        created_at: new Date().toISOString()
      });
      return;
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, userData: Partial<User>) => {
    // Skip authentication if using placeholder Supabase config
    if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
      // Mock successful sign up for demo purposes
      setUser({
        id: 'demo-user',
        email,
        role: userData.role || 'citizen',
        name: userData.name || 'Demo User',
        region: userData.region || 'Coastal Zone A',
        organization: userData.organization,
        created_at: new Date().toISOString()
      });
      return;
    }
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    // Handle sign out for demo mode
    if (import.meta.env.VITE_SUPABASE_URL?.includes('placeholder')) {
      setUser(null);
      return;
    }
    
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};