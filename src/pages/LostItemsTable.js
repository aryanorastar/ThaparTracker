import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import './LostItemsTable.css';

const LostItemsTable = ({ items: propItems }) => {
  const [items, setItems] = useState(propItems || []);
  const [loading, setLoading] = useState(!propItems);
  const [error, setError] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  
  // Sorting state
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Filtering state
  const [filters, setFilters] = useState({
    searchQuery: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    location: ''
  });
  
  useEffect(() => {
    if (propItems) {
      setItems(propItems);
      setLoading(false);
    } else {
      fetchLostItems();
    }
  }, [propItems, sortField, sortDirection, filters]);

  const fetchLostItems = async () => {
    try {
      setLoading(true);
      
      // Start building the query
      let query = supabase
        .from('items')
        .select('*')
        .eq('item_type', 'lost');
      
      // Apply filters
      if (filters.searchQuery) {
        query = query.or(`item_name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
      }
      
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      
      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }
      
      if (filters.dateFrom) {
        query = query.gte('date', filters.dateFrom);
      }
      
      if (filters.dateTo) {
        query = query.lte('date', filters.dateTo);
      }
      
      // Apply sorting
      query = query.order(sortField, { ascending: sortDirection === 'asc' });
      
      // Execute the query
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching lost items:', error);
      setError('Unable to load lost items at this time');
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    // If clicking the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      dateFrom: '',
      dateTo: '',
      location: ''
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const addSampleItem = async () => {
    try {
      setLoading(true);
      
      const newItem = {
        item_type: 'lost', // Using lowercase 'lost' to match constraint
        item_name: 'Sample Item ' + new Date().toLocaleTimeString(),
        description: 'This is a sample item created from the test interface',
        category: 'electronics',
        date: new Date().toISOString().split('T')[0],
        location: 'Thapar University',
        contact_info: 'test@example.com'
      };
      
      const { data, error } = await supabase
        .from('items')
        .insert(newItem)
        .select();
      
      if (error) {
        alert(`Error adding sample item: ${error.message}`);
        console.error('Error adding sample item:', error);
      } else {
        alert('Sample item added successfully!');
        console.log('Sample item added:', data);
        fetchLostItems(); // Refresh the items
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lost-items-table-container">
      <header>
        <h1>Thapar University Lost Items</h1>
        <p>Browse the list of reported lost items</p>
      </header>

      <div className="controls-section">
        <div className="filters">
          <div className="filter-row">
            <div className="filter-group">
              <input
                type="text"
                name="searchQuery"
                value={filters.searchQuery}
                onChange={handleFilterChange}
                placeholder="Search by name or description"
                className="search-input"
              />
            </div>
            
            <div className="filter-group">
              <select 
                name="category" 
                value={filters.category}
                onChange={handleFilterChange}
                className="category-select"
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="id-cards">ID Cards</option>
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
                value={filters.location}
                onChange={handleFilterChange}
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
                value={filters.dateFrom}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group date-filter">
              <label>To:</label>
              <input
                type="date"
                name="dateTo"
                value={filters.dateTo}
                onChange={handleFilterChange}
              />
            </div>
            
            <button 
              className="clear-filters-button"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        <div className="actions">
          <button 
            className="add-item-button"
            onClick={addSampleItem}
          >
            Add Sample Item
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading lost items...</div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchLostItems}>Try Again</button>
        </div>
      ) : (
        <div className="items-table-wrapper">
          {items.length > 0 ? (
            <table className="items-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('item_name')}>
                    Item Name {renderSortIndicator('item_name')}
                  </th>
                  <th onClick={() => handleSort('description')}>
                    Description {renderSortIndicator('description')}
                  </th>
                  <th onClick={() => handleSort('category')}>
                    Category {renderSortIndicator('category')}
                  </th>
                  <th onClick={() => handleSort('date')}>
                    Date Lost {renderSortIndicator('date')}
                  </th>
                  <th onClick={() => handleSort('location')}>
                    Location {renderSortIndicator('location')}
                  </th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.item_name}</td>
                    <td>{item.description}</td>
                    <td>{item.category}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.location}</td>
                    <td>
                      {item.contact_info && (
                        <a href={`mailto:${item.contact_info}`}>
                          Contact
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-items">
              <p>No lost items found with the current filters.</p>
              <p>Try adjusting your filters or add a sample item.</p>
            </div>
          )}
        </div>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} Thapar University Lost and Found</p>
      </footer>
    </div>
  );
};

export default LostItemsTable;
