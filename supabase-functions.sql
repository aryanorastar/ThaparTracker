-- Create function to create the lost_items table
CREATE OR REPLACE FUNCTION create_lost_items_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.lost_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    item_name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    date_lost DATE NOT NULL,
    location TEXT,
    image_url TEXT,
    contact_info TEXT,
    status TEXT DEFAULT 'active'
  );
  
  -- Set up RLS policies
  ALTER TABLE public.lost_items ENABLE ROW LEVEL SECURITY;
  
  -- Create policy for reading
  CREATE POLICY IF NOT EXISTS "Enable read access for all users" 
    ON public.lost_items FOR SELECT 
    USING (true);
    
  -- Create policy for inserting - restrict to authenticated users
  CREATE POLICY IF NOT EXISTS "Enable insert for authenticated users only" 
    ON public.lost_items FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
    
  -- Create policy for updating/deleting - restrict to authenticated users
  CREATE POLICY IF NOT EXISTS "Enable update/delete for authenticated users only" 
    ON public.lost_items FOR UPDATE 
    TO authenticated 
    USING (true);
    
  CREATE POLICY IF NOT EXISTS "Enable delete for authenticated users only" 
    ON public.lost_items FOR DELETE 
    TO authenticated 
    USING (true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to create the found_items table
CREATE OR REPLACE FUNCTION create_found_items_table()
RETURNS void AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.found_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    item_name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    date_found DATE NOT NULL,
    location TEXT,
    image_url TEXT,
    contact_info TEXT,
    status TEXT DEFAULT 'active'
  );
  
  -- Set up RLS policies
  ALTER TABLE public.found_items ENABLE ROW LEVEL SECURITY;
  
  -- Create policy for reading
  CREATE POLICY IF NOT EXISTS "Enable read access for all users" 
    ON public.found_items FOR SELECT 
    USING (true);
    
  -- Create policy for inserting - restrict to authenticated users
  CREATE POLICY IF NOT EXISTS "Enable insert for authenticated users only" 
    ON public.found_items FOR INSERT 
    TO authenticated 
    WITH CHECK (true);
    
  -- Create policy for updating/deleting - restrict to authenticated users
  CREATE POLICY IF NOT EXISTS "Enable update for authenticated users only" 
    ON public.found_items FOR UPDATE 
    TO authenticated 
    USING (true);
    
  CREATE POLICY IF NOT EXISTS "Enable delete for authenticated users only" 
    ON public.found_items FOR DELETE 
    TO authenticated 
    USING (true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add sample data
CREATE OR REPLACE FUNCTION add_sample_data()
RETURNS void AS $$
BEGIN
  -- Sample lost items
  INSERT INTO public.lost_items (item_name, description, category, date_lost, location, image_url, contact_info)
  VALUES
    ('MacBook Pro', 'Silver MacBook Pro 13" with stickers on the cover. Last seen in the library while studying for exams.', 'electronics', '2025-04-12', 'Library, 2nd Floor', 'https://via.placeholder.com/500x300', 'john.doe@thapar.edu'),
    ('Student ID Card', 'Thapar University ID Card for Rahul Kumar.', 'id-cards', '2025-04-10', 'Academic Block', 'https://via.placeholder.com/500x300', 'rahul.kumar@thapar.edu'),
    ('Water Bottle', 'Blue Hydro Flask with stickers. Has a dent on the bottom and a Thapar University logo sticker.', 'accessories', '2025-04-08', 'Sports Complex', 'https://via.placeholder.com/500x300', 'amit.patel@thapar.edu');

  -- Sample found items
  INSERT INTO public.found_items (item_name, description, category, date_found, location, image_url, contact_info)
  VALUES
    ('Calculator', 'Scientific calculator (Casio FX-991EX) found in Lecture Hall 3.', 'electronics', '2025-04-13', 'Lecture Hall 3', 'https://via.placeholder.com/500x300', 'jane.smith@thapar.edu'),
    ('Umbrella', 'Black umbrella with wooden handle found near the cafeteria entrance.', 'accessories', '2025-04-11', 'Cafeteria', 'https://via.placeholder.com/500x300', 'security@thapar.edu'),
    ('Textbook', 'Engineering Mathematics textbook found in the library study room.', 'books', '2025-04-09', 'Library Study Room', 'https://via.placeholder.com/500x300', 'library@thapar.edu');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Execute the functions to create tables
SELECT create_lost_items_table();
SELECT create_found_items_table();

-- Add sample data (uncomment to execute)
-- SELECT add_sample_data();
