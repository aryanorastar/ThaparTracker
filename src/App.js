import React, { useState, useEffect } from 'react';
import './App.css';
import LostItemsTable from './pages/LostItemsTable';
import ImageGallery from './components/ImageGallery';
import { supabase } from './utils/supabaseClient';

function App() {
  const [dbStatus, setDbStatus] = useState({ checked: false, success: false, message: '' });
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchParams, setSearchParams] = useState({
    searchQuery: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    location: ''
  });

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
        setFilteredItems(data || []);
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

  // Apply filters when search parameters change
  useEffect(() => {
    filterItems();
  }, [searchParams, items]);

  // Filter items based on search parameters
  const filterItems = () => {
    let filtered = [...items];
    
    // Apply search query
    if (searchParams.searchQuery) {
      const query = searchParams.searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        (item.item_name && item.item_name.toLowerCase().includes(query)) || 
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.location && item.location.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (searchParams.category) {
      filtered = filtered.filter(item => item.category === searchParams.category);
    }
    
    // Apply location filter
    if (searchParams.location) {
      const locationQuery = searchParams.location.toLowerCase();
      filtered = filtered.filter(item => 
        item.location && item.location.toLowerCase().includes(locationQuery)
      );
    }
    
    // Apply date filters
    if (searchParams.dateFrom) {
      filtered = filtered.filter(item => 
        item.date && new Date(item.date) >= new Date(searchParams.dateFrom)
      );
    }
    
    if (searchParams.dateTo) {
      filtered = filtered.filter(item => 
        item.date && new Date(item.date) <= new Date(searchParams.dateTo)
      );
    }
    
    setFilteredItems(filtered);
  };

  // Handle search parameter changes
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({
      searchQuery: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      location: ''
    });
  };

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
      
      {/* Unified Search Section */}
      <div className="unified-search-container">
        <h2 className="search-title">Find Lost Items</h2>
        
        <div className="search-bar">
          <input
            type="text"
            name="searchQuery"
            value={searchParams.searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by item name, description, or location..."
            className="search-input"
          />
        </div>
        
        <div className="filters">
          <div className="filter-row">
            <div className="filter-group">
              <select
                name="category"
                value={searchParams.category}
                onChange={handleSearchChange}
                className="category-select"
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
                <option value="books">Books</option>
                <option value="clothing">Clothing</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="filter-group">
              <input
                type="text"
                name="location"
                value={searchParams.location}
                onChange={handleSearchChange}
                placeholder="Filter by location"
                className="location-input"
              />
            </div>
          </div>
          
          <div className="filter-row">
            <div className="filter-group date-filter">
              <label>From:</label>
              <input
                type="date"
                name="dateFrom"
                value={searchParams.dateFrom}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="filter-group date-filter">
              <label>To:</label>
              <input
                type="date"
                name="dateTo"
                value={searchParams.dateTo}
                onChange={handleSearchChange}
              />
            </div>
            
            {(searchParams.searchQuery || searchParams.category || searchParams.location || searchParams.dateFrom || searchParams.dateTo) && (
              <button 
                className="clear-filters-button"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
        
        <div className="search-results-info">
          <p>Found {filteredItems.length} items</p>
        </div>
      </div>
      
      {/* Image Gallery */}
      <ImageGallery items={filteredItems} />
      
      {/* Items Table */}
      <LostItemsTable items={filteredItems} />
    </div>
  );
}

export default App;
