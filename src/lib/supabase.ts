import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          level: number;
          xp: number;
          specialization_id: string;
          stats: Record<string, number>;
          completed_missions: string[];
          achievements: string[];
          inventory: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          level?: number;
          xp?: number;
          specialization_id?: string;
          stats?: Record<string, number>;
          completed_missions?: string[];
          achievements?: string[];
          inventory?: string[];
        };
        Update: {
          name?: string;
          level?: number;
          xp?: number;
          specialization_id?: string;
          stats?: Record<string, number>;
          completed_missions?: string[];
          achievements?: string[];
          inventory?: string[];
          updated_at?: string;
        };
      };
    };
  };
};