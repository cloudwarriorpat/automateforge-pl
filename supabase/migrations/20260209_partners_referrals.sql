/*
  # Partners & Referrals Schema

  1. New Tables
    - `partners`
      - `id` (uuid, primary key)
      - `company_name` (text) - partner company name
      - `contact_name` (text) - primary contact
      - `email` (text, unique) - partner email
      - `phone` (text, optional)
      - `status` (text) - active, pending, inactive
      - `commission_rate` (integer) - percentage (e.g. 15 = 15%)
      - `notes` (text, optional)
      - `created_at` (timestamptz)

    - `referrals`
      - `id` (uuid, primary key)
      - `partner_id` (uuid, FK → partners)
      - `referred_company` (text) - name of referred company
      - `referred_email` (text)
      - `referred_phone` (text, optional)
      - `service` (text) - interested service
      - `status` (text) - new, contacted, qualified, converted, lost
      - `deal_value` (integer, optional) - deal value in PLN grosze
      - `commission_paid` (boolean) - whether commission was paid
      - `notes` (text, optional)
      - `created_at` (timestamptz)
      - `converted_at` (timestamptz, optional)

  2. Security
    - Enable RLS on both tables
    - No anon access — admin-only via service_role key
    - Partners can submit referrals via the contact form (goes to leads table)
*/

CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_name text NOT NULL DEFAULT '',
  email text NOT NULL UNIQUE,
  phone text DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  commission_rate integer NOT NULL DEFAULT 15,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

-- No anon policies — managed via service_role or dashboard only

CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid NOT NULL REFERENCES partners(id) ON DELETE CASCADE,
  referred_company text NOT NULL,
  referred_email text NOT NULL,
  referred_phone text DEFAULT '',
  service text NOT NULL DEFAULT 'general',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  deal_value integer DEFAULT 0,
  commission_paid boolean DEFAULT false,
  notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  converted_at timestamptz
);

ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- No anon policies — managed via service_role or dashboard only
