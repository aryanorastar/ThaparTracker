import React, { useState, useEffect } from 'react';
import Tabs from '../components/Tabs/Tabs';
import SearchFilters from '../components/SearchFilters/SearchFilters';
import ItemForm from '../components/ItemForm/ItemForm';
import { testSupabaseConnection, setupSupabaseTables } from '../utils/testSupabase';

const Home = ({ dbStatus }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
    location: '',
    searchQuery: '',
  });

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
        
        {dbStatus && dbStatus.checked && (
          <div className={`connection-status ${dbStatus.success ? 'success' : 'error'}`}>
            {dbStatus.message}
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
      
      {dbStatus && dbStatus.success ? (
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} filters={filters} />
      ) : (
        <div className="db-error-message">
          <h3>Database Connection Issue</h3>
          <p>We're unable to display items at this time. Please try again later.</p>
          <p>If you're an administrator, please ensure the database tables are set up correctly.</p>
          <div className="setup-instructions">
            <h4>Setup Instructions:</h4>
            <ol>
              <li>Log in to your Supabase dashboard</li>
              <li>Navigate to the SQL Editor</li>
              <li>Run the SQL script from the <code>supabase-setup.sql</code> file</li>
              <li>Refresh this page</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
