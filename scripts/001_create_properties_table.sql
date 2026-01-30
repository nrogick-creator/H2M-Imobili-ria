-- Create properties table for real estate listings
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('sale', 'rent')),
  property_type VARCHAR(50) NOT NULL CHECK (property_type IN ('apartment', 'house', 'commercial', 'land', 'penthouse')),
  bedrooms INTEGER,
  bathrooms INTEGER,
  area DECIMAL(10, 2) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(50) NOT NULL,
  zip_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'pending', 'sold', 'rented')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(type);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view available properties
CREATE POLICY "Anyone can view available properties"
  ON properties
  FOR SELECT
  USING (status = 'available');

-- Policy: Authenticated users can do everything (for admin)
CREATE POLICY "Authenticated users can manage properties"
  ON properties
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
