-- Create the lost_items table
CREATE TABLE IF NOT EXISTS lost_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  image_url TEXT,
  contact_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the found_items table
CREATE TABLE IF NOT EXISTS found_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  item_name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  image_url TEXT,
  contact_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an admins table to track admin users
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS) policies

-- Enable RLS on the tables
ALTER TABLE lost_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE found_items ENABLE ROW LEVEL SECURITY;

-- Create policies for lost_items

-- Allow anyone to read lost items
CREATE POLICY "Enable read access for all users on lost items" 
ON lost_items FOR SELECT 
TO public 
USING (true);

-- Allow only authenticated admins to insert, update, delete lost items
CREATE POLICY "Enable admin access for lost items" 
ON lost_items FOR ALL 
TO authenticated 
USING (auth.uid() IN (SELECT id FROM admins));

-- Create policies for found_items

-- Allow anyone to read found items
CREATE POLICY "Enable read access for all users on found items" 
ON found_items FOR SELECT 
TO public 
USING (true);

-- Allow only authenticated admins to insert, update, delete found items
CREATE POLICY "Enable admin access for found items" 
ON found_items FOR ALL 
TO authenticated 
USING (auth.uid() IN (SELECT id FROM admins));

-- Insert some sample data

-- Sample lost items
INSERT INTO lost_items (item_name, description, category, location, date, image_url, contact_info)
VALUES
  ('MacBook Pro', 'Silver MacBook Pro 13" with stickers on the cover. Last seen in the library while studying for exams.', 'electronics', 'Library, 2nd Floor', '2025-04-12', 'https://via.placeholder.com/500x300', 'john.doe@thapar.edu'),
  ('Student ID Card', 'Thapar University ID Card for Rahul Kumar.', 'id-cards', 'Academic Block', '2025-04-10', 'https://via.placeholder.com/500x300', 'rahul.kumar@thapar.edu'),
  ('Water Bottle', 'Blue Hydro Flask with stickers. Has a dent on the bottom and a Thapar University logo sticker.', 'accessories', 'Sports Complex', '2025-04-08', 'https://via.placeholder.com/500x300', 'amit.patel@thapar.edu');

-- Sample found items
INSERT INTO found_items (item_name, description, category, location, date, image_url, contact_info)
VALUES
  ('Calculator', 'Scientific calculator (Casio FX-991EX) found in Lecture Hall 3.', 'electronics', 'Lecture Hall 3', '2025-04-13', 'https://via.placeholder.com/500x300', 'jane.smith@thapar.edu'),
  ('Umbrella', 'Black umbrella with wooden handle found near the cafeteria entrance.', 'accessories', 'Cafeteria', '2025-04-11', 'https://via.placeholder.com/500x300', 'security@thapar.edu'),
  ('Textbook', 'Engineering Mathematics textbook found in the library study room.', 'books', 'Library Study Room', '2025-04-09', 'https://via.placeholder.com/500x300', 'library@thapar.edu');
