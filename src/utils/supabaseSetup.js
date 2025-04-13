import { supabase } from './supabaseClient';

// Function to check if the database tables exist
export const checkDatabaseTables = async () => {
  console.log('Checking database tables...');
  
  try {
    // Check if lost_items table exists
    const { data: lostItemsData, error: lostCheckError } = await supabase
      .from('lost_items')
      .select('count(*)', { count: 'exact', head: true });
      
    // Check if found_items table exists
    const { data: foundItemsData, error: foundCheckError } = await supabase
      .from('found_items')
      .select('count(*)', { count: 'exact', head: true });
    
    // If there are errors about tables not existing
    if (lostCheckError && lostCheckError.code === '42P01') {
      console.error('Lost items table does not exist:', lostCheckError.message);
      return { 
        success: false, 
        error: lostCheckError,
        message: 'The lost_items table does not exist. Please run the setup SQL script in Supabase.'
      };
    }
    
    if (foundCheckError && foundCheckError.code === '42P01') {
      console.error('Found items table does not exist:', foundCheckError.message);
      return { 
        success: false, 
        error: foundCheckError,
        message: 'The found_items table does not exist. Please run the setup SQL script in Supabase.'
      };
    }
    
    // If there are other errors
    if (lostCheckError) {
      console.error('Error checking lost_items table:', lostCheckError);
      return { success: false, error: lostCheckError };
    }
    
    if (foundCheckError) {
      console.error('Error checking found_items table:', foundCheckError);
      return { success: false, error: foundCheckError };
    }
    
    console.log('Database tables exist and are accessible');
    return { 
      success: true,
      lostItemsCount: lostItemsData?.count || 0,
      foundItemsCount: foundItemsData?.count || 0
    };
  } catch (error) {
    console.error('Database check error:', error);
    return { success: false, error };
  }
};

// This function would be used in a secure backend environment, not in the frontend
// It's included here for documentation purposes only
export const createDatabaseTables = async () => {
  console.log('This function should only be run in a secure backend environment');
  console.log('Do not expose service role keys in frontend code');
  
  // The SQL to create tables is in the supabase-setup.sql file
  return { 
    success: false, 
    message: 'For security reasons, tables should be created manually or via a secure backend' 
  };
};
