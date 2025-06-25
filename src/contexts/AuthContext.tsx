import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { Player } from '../types/game';
import { defaultPlayer, specializations } from '../data/gameData';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  player: Player | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updatePlayer: (updates: Partial<Player>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadPlayerProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await loadPlayerProfile(session.user.id);
        } else {
          setPlayer(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadPlayerProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
        return;
      }

      if (data) {
        const playerData: Player = {
          id: data.id,
          name: data.name,
          level: data.level,
          xp: data.xp,
          xpToNext: (data.level * 200) - data.xp,
          specialization: specializations.find(s => s.id === data.specialization_id) || specializations[0],
          stats: data.stats,
          inventory: [],
          achievements: [],
          completedMissions: data.completed_missions || []
        };
        setPlayer(playerData);
      }
    } catch (error) {
      console.error('Error loading player profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data.user) {
      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: data.user.email!,
          name,
          level: 1,
          xp: 0,
          specialization_id: specializations[0].id,
          stats: defaultPlayer.stats,
          completed_missions: [],
          achievements: [],
          inventory: []
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
    }

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const updatePlayer = async (updates: Partial<Player>) => {
    if (!user || !player) return;

    const updatedPlayer = { ...player, ...updates };
    setPlayer(updatedPlayer);

    // Update in database
    const { error } = await supabase
      .from('profiles')
      .update({
        name: updatedPlayer.name,
        level: updatedPlayer.level,
        xp: updatedPlayer.xp,
        specialization_id: updatedPlayer.specialization.id,
        stats: updatedPlayer.stats,
        completed_missions: updatedPlayer.completedMissions,
        achievements: updatedPlayer.achievements.map(a => a.id),
        inventory: updatedPlayer.inventory.map(i => i.id),
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating player:', error);
    }
  };

  const value = {
    user,
    session,
    player,
    loading,
    signUp,
    signIn,
    signOut,
    updatePlayer
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}