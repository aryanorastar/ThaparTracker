-- Create a single items table
CREATE TABLE IF NOT EXISTS public.items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  item_type TEXT NOT NULL CHECK (item_type IN ('lost', 'found')),
  item_name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  date DATE NOT NULL,
  location TEXT,
  image_url TEXT,
  contact_info TEXT,
  status TEXT DEFAULT 'active'
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create policy for reading (available to everyone)
CREATE POLICY "Enable read access for all users" 
  ON public.items FOR SELECT 
  USING (true);

-- Create policy for inserting (available only to authenticated users)
CREATE POLICY "Enable insert for authenticated users only" 
  ON public.items FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Sample data for testing
INSERT INTO public.items (item_type, item_name, description, category, date, location, image_url, contact_info)
VALUES
  ('lost', 'MacBook Pro', 'Silver MacBook Pro 13" with stickers on the cover. Last seen in the library while studying for exams.', 'electronics', '2025-04-12', 'Library, 2nd Floor', 'https://via.placeholder.com/500x300', 'john.doe@thapar.edu'),
  ('lost', 'Student ID Card', 'Thapar University ID Card for Rahul Kumar.', 'id-cards', '2025-04-10', 'Academic Block', 'https://via.placeholder.com/500x300', 'rahul.kumar@thapar.edu'),
  ('lost', 'Water Bottle', 'Blue Hydro Flask with stickers. Has a dent on the bottom and a Thapar University logo sticker.', 'accessories', '2025-04-08', 'Sports Complex', 'https://via.placeholder.com/500x300', 'amit.patel@thapar.edu'),
  ('found', 'Calculator', 'Scientific calculator (Casio FX-991EX) found in Lecture Hall 3.', 'electronics', '2025-04-13', 'Lecture Hall 3', 'https://via.placeholder.com/500x300', 'jane.smith@thapar.edu'),
  ('found', 'Umbrella', 'Black umbrella with wooden handle found near the cafeteria entrance.', 'accessories', '2025-04-11', 'Cafeteria', 'https://via.placeholder.com/500x300', 'security@thapar.edu'),
  ('found', 'Textbook', 'Engineering Mathematics textbook found in the library study room.', 'books', '2025-04-09', 'Library Study Room', 'https://via.placeholder.com/500x300', 'library@thapar.edu');
