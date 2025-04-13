import React, { useState, useEffect } from 'react';
import Tabs from '../components/Tabs/Tabs';
import SearchFilters from '../components/SearchFilters/SearchFilters';
import ItemForm from '../components/ItemForm/ItemForm';
import { testSupabaseConnection, setupSupabaseTables } from '../utils/testSupabase';

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({ tested: false, success: false, message: '' });
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
    location: '',
    searchQuery: '',
  });

  useEffect(() => {
    // Test Supabase connection when component mounts
    const checkConnection = async () => {
      const result = await testSupabaseConnection();
      if (result.success) {
        const tablesResult = await setupSupabaseTables();
        setConnectionStatus({ 
          tested: true, 
          success: result.success && tablesResult.success,
          message: tablesResult.success ? 'Connected to Supabase successfully!' : tablesResult.message || 'Tables not properly configured'
        });
      } else {
        setConnectionStatus({ 
          tested: true, 
          success: false, 
          message: result.error?.message || 'Failed to connect to Supabase'
        });
      }
    };
    
    checkConnection();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleFormSubmit = (formData) => {
    // In a real app with Supabase, this would be handled by an admin
    console.log('Form submitted:', formData);
    setShowForm(false);
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Thapar University Lost and Found</h1>
        <p>Find your lost items or help others find theirs</p>
        
        {connectionStatus.tested && (
          <div className={`connection-status ${connectionStatus.success ? 'success' : 'error'}`}>
            {connectionStatus.message}
          </div>
        )}
        
        <div className="hero-buttons">
          <button 
            className="report-button"
            onClick={() => window.location.href = "mailto:lostfound@thapar.edu?subject=Report%20Lost%20or%20Found%20Item"}
          >
            Report an Item via Email
          </button>
        </div>
      </div>

      <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
      
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} filters={filters} />
    </div>
  );
};

export default Home;
