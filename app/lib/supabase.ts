import { createClient } from '@supabase/supabase-js';

// Use environment variables with fallbacks for local development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dbpytnlpgbuzibmnnvks.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicHl0bmxwZ2J1emlibW5udmtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NTU1NzEsImV4cCI6MjA2MDEzMTU3MX0.xmDZryU2wKYSvH7LGrd_HGBu-hWuaKMzARS9l9tiP0E';

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
