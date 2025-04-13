import { supabase } from './supabaseClient';

// Function to test the Supabase connection
export const testSupabaseConnection = async () => {
  try {
    // Try to fetch a single row from the lost_items table
    const { data, error } = await supabase
      .from('lost_items')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return { success: false, error };
    }
    
    console.log('Successfully connected to Supabase!');
    return { success: true, data };
  } catch (error) {
    console.error('Exception when connecting to Supabase:', error);
    return { success: false, error };
  }
};

// Export a function to create the tables if they don't exist
export const setupSupabaseTables = async () => {
  try {
    // Check if tables exist
    const { data: lostItems, error: lostError } = await supabase
      .from('lost_items')
      .select('count(*)', { count: 'exact' })
      .limit(0);
    
    if (lostError && lostError.code === '42P01') {
      console.log('Lost items table does not exist. Please run the SQL setup script in Supabase.');
      return { success: false, message: 'Tables do not exist' };
    }
    
    if (lostError) {
      console.error('Error checking tables:', lostError);
      return { success: false, error: lostError };
    }
    
    console.log('Supabase tables are set up correctly!');
    return { success: true };
  } catch (error) {
    console.error('Exception when checking tables:', error);
    return { success: false, error };
  }
};
