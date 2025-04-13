import React, { useState } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import './SearchFilters.css';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'books', label: 'Books & Notes' },
  { value: 'id-cards', label: 'ID Cards' },
  { value: 'keys', label: 'Keys' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'other', label: 'Other' },
];

const locations = [
  { value: '', label: 'All Locations' },
  { value: 'library', label: 'Library' },
  { value: 'cafeteria', label: 'Cafeteria' },
  { value: 'academic-block', label: 'Academic Block' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'sports-complex', label: 'Sports Complex' },
  { value: 'other', label: 'Other' },
];

const SearchFilters = ({ filters, onFilterChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onFilterChange({ searchQuery });
  };

  const handleClearFilters = () => {
    onFilterChange({
      category: '',
      dateFrom: '',
      dateTo: '',
      location: '',
      searchQuery: '',
    });
    setSearchQuery('');
  };

  return (
    <div className="search-filters-container">
      <form className="search-bar" onSubmit={handleSearchSubmit}>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Search for lost or found items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <FaSearch />
          </button>
        </div>
        
        <button 
          type="button" 
          className="filter-toggle-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          <span>Filters</span>
        </button>
      </form>

      {showFilters && (
        <div className="filters-panel">
          <div className="filters-header">
            <h3>Filter Options</h3>
            <button 
              className="close-filters-button"
              onClick={() => setShowFilters(false)}
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="filters-grid">
            <div className="filter-group">
              <label htmlFor="category">Category</label>
              <select 
                id="category"
                value={filters.category}
                onChange={(e) => onFilterChange({ category: e.target.value })}
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="location">Location</label>
              <select 
                id="location"
                value={filters.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
              >
                {locations.map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="dateFrom">Date From</label>
              <input 
                type="date"
                id="dateFrom"
                value={filters.dateFrom}
                onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
              />
            </div>

            <div className="filter-group">
              <label htmlFor="dateTo">Date To</label>
              <input 
                type="date"
                id="dateTo"
                value={filters.dateTo}
                onChange={(e) => onFilterChange({ dateTo: e.target.value })}
              />
            </div>
          </div>

          <div className="filters-actions">
            <button 
              className="clear-filters-button"
              onClick={handleClearFilters}
            >
              Clear All Filters
            </button>
            <button 
              className="apply-filters-button"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
