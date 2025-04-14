import React, { useState, useEffect } from 'react';
import './App.css';
import LostItemsTable from './pages/LostItemsTable';
import ImageGallery from './components/ImageGallery';
import { supabase } from './utils/supabaseClient';

function App() {
  const [dbStatus, setDbStatus] = useState({ checked: false, success: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        // Check if the items table exists
        const { data, count, error } = await supabase
          .from('items')
          .select('*', { count: 'exact' });
        
        if (error) {
          throw error;
        }
        
        setItems(data || []);
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
      <div className="loading-screen bg-gradient-to-r from-blue-900 to-indigo-900 flex flex-col items-center justify-center min-h-screen">
        <div className="loading-animation-container w-24 h-24 mb-8">
          <div className="loading-circle"></div>
          <div className="loading-circle delay-1"></div>
          <div className="loading-circle delay-2"></div>
        </div>
        <p className="text-white text-xl mt-6 font-light">Connecting to database...</p>
      </div>
    );
  }

  if (!dbStatus.success) {
    return (
      <div className="db-error-screen bg-gradient-to-r from-blue-900 to-indigo-900 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="error-icon-container relative w-24 h-24 mb-8 opacity-50">
          <div className="error-icon"></div>
        </div>
        <h2 className="text-white text-3xl font-bold mb-4">Database Connection Error</h2>
        <p className="text-blue-200 text-xl mb-4">{dbStatus.message}</p>
        <p className="text-blue-200 mb-8">Please ensure the database table is set up correctly using the provided SQL script.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="App relative">
      {/* Background Animation */}
      <div className="background-animation absolute inset-0 -z-10">
        <div className="animated-gradient"></div>
        <div className="animated-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      {/* Hero Section */}
      <div className="hero-section relative overflow-hidden bg-gradient-to-r from-blue-700/90 to-indigo-900/90 text-white py-20 px-4 rounded-xl shadow-2xl mb-12">
        <div className="hero-content container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Thapar University Lost & Found
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
            A platform for Thapar University students and staff to report and find lost items on campus.
          </p>
        </div>
        <div className="hero-decoration absolute inset-0 -z-10">
          <div className="floating-object"></div>
          <div className="floating-object delay-1"></div>
          <div className="floating-object delay-2"></div>
        </div>
      </div>
      
      <ImageGallery items={items} />
      
      <LostItemsTable items={items} />
    </div>
  );
}

export default App;
