/*
  # Initial Schema Setup for Restaurant Management System

  1. New Tables
    - ingredients
      - id (uuid, primary key)
      - name (text)
      - quantity (numeric)
      - unit (text)
      - category (text)
      - min_threshold (numeric)
      - last_updated (timestamptz)
      - consumed_today (numeric)
      - expiry_date (date)
      - cost (numeric)
      - supplier (text)
      - lot_number (text)
      
    - dishes
      - id (uuid, primary key)
      - name (text)
      - price (numeric)
      - category (text)
      - servings_today (integer)
      - last_served (timestamptz)
      - cost_per_serving (numeric)
      - profit_margin (numeric)
      
    - dish_ingredients
      - id (uuid, primary key)
      - dish_id (uuid, foreign key)
      - ingredient_id (uuid, foreign key)
      - quantity (numeric)
      
    - service_records
      - id (uuid, primary key)
      - date (timestamptz)
      - period_id (text)
      - dish_id (uuid, foreign key)
      - quantity (integer)
      - revenue (numeric)
      - cost (numeric)
      - profit (numeric)
      
    - suppliers
      - id (uuid, primary key)
      - name (text)
      - contact (text)
      - email (text)
      - phone (text)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  quantity numeric NOT NULL DEFAULT 0,
  unit text NOT NULL,
  category text NOT NULL,
  min_threshold numeric NOT NULL DEFAULT 0,
  last_updated timestamptz DEFAULT now(),
  consumed_today numeric DEFAULT 0,
  expiry_date date,
  cost numeric NOT NULL DEFAULT 0,
  supplier text,
  lot_number text
);

-- Create dishes table
CREATE TABLE IF NOT EXISTS dishes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  category text NOT NULL,
  servings_today integer DEFAULT 0,
  last_served timestamptz DEFAULT now(),
  cost_per_serving numeric DEFAULT 0,
  profit_margin numeric DEFAULT 0
);

-- Create dish_ingredients table
CREATE TABLE IF NOT EXISTS dish_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dish_id uuid REFERENCES dishes(id) ON DELETE CASCADE,
  ingredient_id uuid REFERENCES ingredients(id) ON DELETE CASCADE,
  quantity numeric NOT NULL DEFAULT 0
);

-- Create service_records table
CREATE TABLE IF NOT EXISTS service_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date timestamptz DEFAULT now(),
  period_id text NOT NULL,
  dish_id uuid REFERENCES dishes(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 0,
  revenue numeric NOT NULL DEFAULT 0,
  cost numeric NOT NULL DEFAULT 0,
  profit numeric NOT NULL DEFAULT 0
);

-- Create suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact text,
  email text,
  phone text
);

-- Enable Row Level Security
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dish_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated users to manage ingredients"
  ON ingredients FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage dishes"
  ON dishes FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage dish_ingredients"
  ON dish_ingredients FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage service_records"
  ON service_records FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage suppliers"
  ON suppliers FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);