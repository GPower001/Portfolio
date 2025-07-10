/*
  # Create visitors tracking table

  1. New Tables
    - `visitors`
      - `id` (uuid, primary key)
      - `ip_address` (text, nullable)
      - `user_agent` (text, nullable)
      - `page_visited` (text, not null)
      - `visit_time` (timestamptz, not null, default now())
      - `country` (text, nullable)
      - `city` (text, nullable)
      - `referrer` (text, nullable)
  2. Security
    - Enable RLS on `visitors` table
    - Add policy for authenticated users to read visitor data
*/

CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text,
  user_agent text,
  page_visited text NOT NULL,
  visit_time timestamptz NOT NULL DEFAULT now(),
  country text,
  city text,
  referrer text
);

ALTER TABLE visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read visitor data"
  ON visitors
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow insertion of visitor data"
  ON visitors
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);