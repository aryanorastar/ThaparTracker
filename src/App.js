import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header/Header';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import MyListings from './pages/MyListings';
import NotFound from './pages/NotFound';
import { checkDatabaseTables } from './utils/supabaseSetup';

function App() {
  const [dbStatus, setDbStatus] = useState({ checked: false, success: false, message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const result = await checkDatabaseTables();
        setDbStatus({
          checked: true,
          success: result.success,
          message: result.message || (result.success 
            ? `Database connected successfully! Found ${result.lostItemsCount} lost items and ${result.foundItemsCount} found items.` 
            : 'Failed to connect to database')
        });
      } catch (error) {
        console.error('Error checking database:', error);
        setDbStatus({
          checked: true,
          success: false,
          message: 'An unexpected error occurred while checking the database'
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

  return (
    <Router>
      <div className="App">
        <Header />
        {!dbStatus.success && (
          <div className="db-error-banner">
            <p>{dbStatus.message}</p>
            <p>Please ensure the database tables are set up correctly using the provided SQL script.</p>
            <button onClick={() => window.location.reload()}>Retry Connection</button>
          </div>
        )}
        <main>
          <Routes>
            <Route path="/" element={<Home dbStatus={dbStatus} />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          <p> {new Date().getFullYear()} Thapar University Lost and Found</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
