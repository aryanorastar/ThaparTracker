import { supabase } from './supabaseClient';

// Function to test the Supabase connection
export const testSupabaseConnection = async () => {
  try {
    // Try to fetch a single row from the lost_items table
    const { data: lostItemsData, error: lostItemsError } = await supabase
      .from('lost_items')
      .select('*')
      .limit(1);
    
    if (lostItemsError) {
      console.error('Error connecting to Supabase lost_items table:', lostItemsError);
      return { success: false, error: lostItemsError };
    }
    
    // Try to fetch a single row from the found_items table
    const { data: foundItemsData, error: foundItemsError } = await supabase
      .from('found_items')
      .select('*')
      .limit(1);
    
    if (foundItemsError) {
      console.error('Error connecting to Supabase found_items table:', foundItemsError);
      return { success: false, error: foundItemsError };
    }
    
    console.log('Successfully connected to Supabase!');
    return { success: true, data: { lostItemsData, foundItemsData } };
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
      return { 
        success: false, 
        message: 'Tables do not exist. Please run the SQL setup script in the Supabase SQL Editor.' 
      };
    }
    
    if (lostError) {
      console.error('Error checking tables:', lostError);
      return { success: false, error: lostError };
    }
    
    // Check if found_items table exists
    const { data: foundItems, error: foundError } = await supabase
      .from('found_items')
      .select('count(*)', { count: 'exact' })
      .limit(0);
      
    if (foundError && foundError.code === '42P01') {
      console.log('Found items table does not exist. Please run the SQL setup script in Supabase.');
      return { 
        success: false, 
        message: 'Tables do not exist. Please run the SQL setup script in the Supabase SQL Editor.' 
      };
    }
    
    if (foundError) {
      console.error('Error checking tables:', foundError);
      return { success: false, error: foundError };
    }
    
    console.log('Supabase tables are set up correctly!');
    return { success: true };
  } catch (error) {
    console.error('Exception when checking tables:', error);
    return { success: false, error };
  }
};
