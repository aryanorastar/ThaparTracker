import React, { useState, useEffect } from 'react';
import './App.css';
import LostItemsTable from './pages/LostItemsTable';
import { supabase } from './utils/supabaseClient';

function App() {
  const [dbStatus, setDbStatus] = useState({ checked: false, success: false, message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        // Check if the items table exists
        const { count, error } = await supabase
          .from('items')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          throw error;
        }
        
        setDbStatus({
          checked: true,
          success: true,
          message: `Database connected successfully! Found ${count} items.`
        });
      } catch (error) {
        console.error('Error checking database:', error);
        setDbStatus({
          checked: true,
          success: false,
          message: 'Failed to connect to database. Please make sure the "items" table exists.'
        });
      } finally {
        setLoading(false);
      }
    };

    checkDatabase();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Connecting to database...</p>
      </div>
    );
  }

  if (!dbStatus.success) {
    return (
      <div className="db-error-screen">
        <h2>Database Connection Error</h2>
        <p>{dbStatus.message}</p>
        <p>Please ensure the database table is set up correctly using the provided SQL script.</p>
        <button onClick={() => window.location.reload()}>Retry Connection</button>
      </div>
    );
  }

  return (
    <div className="App">
      <LostItemsTable />
    </div>
  );
}

export default App;
