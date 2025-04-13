import React, { useState } from 'react';
import Tabs from '../components/Tabs/Tabs';
import SearchFilters from '../components/SearchFilters/SearchFilters';
import ItemCard from '../components/ItemCard/ItemCard';
import ItemForm from '../components/ItemForm/ItemForm';

// Temporary mock data
const mockItems = [
  {
    id: '1',
    type: 'lost',
    name: 'MacBook Pro',
    description: 'Silver MacBook Pro 13" with stickers on the cover',
    category: 'electronics',
    date: '2025-04-12',
    location: 'Library, 2nd Floor',
    image: 'https://via.placeholder.com/150',
    contact: 'john.doe@thapar.edu',
  },
  {
    id: '2',
    type: 'found',
    name: 'Student ID Card',
    description: 'Thapar University ID Card for Rahul Kumar',
    category: 'id-cards',
    date: '2025-04-13',
    location: 'Cafeteria',
    image: 'https://via.placeholder.com/150',
    contact: 'jane.smith@thapar.edu',
  },
  {
    id: '3',
    type: 'lost',
    name: 'Water Bottle',
    description: 'Blue Hydro Flask with stickers',
    category: 'accessories',
    date: '2025-04-10',
    location: 'Sports Complex',
    image: 'https://via.placeholder.com/150',
    contact: 'amit.patel@thapar.edu',
  },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    dateFrom: '',
    dateTo: '',
    location: '',
    searchQuery: '',
  });

  // Filter items based on active tab and search filters
  const filteredItems = mockItems.filter(item => {
    // Filter by tab
    if (activeTab !== 'all' && item.type !== activeTab) return false;
    
    // Filter by category
    if (filters.category && item.category !== filters.category) return false;
    
    // Filter by location
    if (filters.location && !item.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    
    // Filter by search query
    if (filters.searchQuery && 
        !item.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleFormSubmit = (formData) => {
    // In a real app, this would send data to a backend
    console.log('Form submitted:', formData);
    setShowForm(false);
    // Would add the new item to the list
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Thapar University Lost and Found</h1>
        <p>Find your lost items or help others find theirs</p>
        <button 
          className="report-button"
          onClick={() => setShowForm(true)}
        >
          Report an Item
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <button className="close-button" onClick={() => setShowForm(false)}>×</button>
            <ItemForm onSubmit={handleFormSubmit} />
          </div>
        </div>
      )}

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="items-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))
        ) : (
          <div className="no-items">
            <h3>No items found</h3>
            <p>Try adjusting your filters or be the first to report this item!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
