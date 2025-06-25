/*
  # Create user profiles table for CyberGuardian Academy

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `name` (text)
      - `level` (integer, default 1)
      - `xp` (integer, default 0)
      - `specialization_id` (text, default 'network-security')
      - `stats` (jsonb, stores skill levels)
      - `completed_missions` (text array, stores mission IDs)
      - `achievements` (text array, stores achievement IDs)
      - `inventory` (text array, stores inventory item IDs)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for users to read and update their own profiles
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  level integer DEFAULT 1,
  xp integer DEFAULT 0,
  specialization_id text DEFAULT 'network-security',
  stats jsonb DEFAULT '{"networkSecurity": 15, "digitalForensics": 10, "ethicalHacking": 12, "incidentResponse": 8, "cryptography": 6, "socialEngineering": 14, "compliance": 5, "malwareAnalysis": 7}',
  completed_missions text[] DEFAULT '{}',
  achievements text[] DEFAULT '{}',
  inventory text[] DEFAULT '{"wireshark-pro", "nmap-scanner"}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();