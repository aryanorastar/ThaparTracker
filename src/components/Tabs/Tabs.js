import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import ItemCard from '../ItemCard/ItemCard';
import './Tabs.css';

const Tabs = ({ activeTab, onTabChange, filters }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [activeTab, filters]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      
      // Determine which table to query based on active tab
      let tableName;
      if (activeTab === 'all') {
        // For 'all' tab, we'll need to query both tables and combine results
        const [lostResult, foundResult] = await Promise.all([
          fetchFromTable('lost_items'),
          fetchFromTable('found_items')
        ]);
        
        // Combine and sort by date (newest first)
        const combinedItems = [...(lostResult || []), ...(foundResult || [])];
        setItems(combinedItems.sort((a, b) => new Date(b.date) - new Date(a.date)));
        setLoading(false);
        return;
      } else {
        tableName = activeTab === 'lost' ? 'lost_items' : 'found_items';
      }
      
      const result = await fetchFromTable(tableName);
      setItems(result || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchFromTable = async (tableName) => {
    const dateField = tableName === 'lost_items' ? 'date_lost' : 'date_found';
    
    let query = supabase
      .from(tableName)
      .select('*');
    
    // Apply filters if they exist
    if (filters.category && filters.category !== '') {
      query = query.eq('category', filters.category);
    }
    
    if (filters.location && filters.location !== '') {
      query = query.ilike('location', `%${filters.location}%`);
    }
    
    if (filters.searchQuery && filters.searchQuery !== '') {
      query = query.or(`item_name.ilike.%${filters.searchQuery}%,description.ilike.%${filters.searchQuery}%`);
    }
    
    // Apply date filters if they exist
    if (filters.dateFrom && filters.dateFrom !== '') {
      query = query.gte(dateField, filters.dateFrom);
    }
    
    if (filters.dateTo && filters.dateTo !== '') {
      query = query.lte(dateField, filters.dateTo);
    }
    
    // Only show active items if status field exists
    if (tableName === 'lost_items' || tableName === 'found_items') {
      query = query.order('created_at', { ascending: false });
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error(`Error fetching from ${tableName}:`, error);
      throw error;
    }
    
    // Map the data to a consistent format
    return data.map(item => ({
      ...item,
      type: tableName === 'lost_items' ? 'lost' : 'found',
      // Map date field to a common property for consistent handling
      date: item[dateField] || item.date || item.created_at,
      // Ensure we have these fields even if they're not in the database
      name: item.item_name || item.name || 'Unnamed Item',
      description: item.description || '',
      category: item.category || 'Other',
      location: item.location || 'Unknown',
      contact: item.contact_info || item.contact || '',
      image: item.image_url || item.image || 'https://via.placeholder.com/150'
    }));
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => onTabChange('all')}
        >
          All Items
        </button>
        <button 
          className={`tab ${activeTab === 'lost' ? 'active' : ''}`}
          onClick={() => onTabChange('lost')}
        >
          Lost Items
        </button>
        <button 
          className={`tab ${activeTab === 'found' ? 'active' : ''}`}
          onClick={() => onTabChange('found')}
        >
          Found Items
        </button>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading items...</p>
        </div>
      ) : items.length > 0 ? (
        <div className="items-grid">
          {items.map(item => (
            <ItemCard key={item.id} item={{
              id: item.id,
              name: item.name,
              description: item.description,
              date: item.date,
              location: item.location,
              category: item.category,
              image: item.image,
              contact: item.contact,
              type: item.type,
              status: item.status || 'active'
            }} />
          ))}
        </div>
      ) : (
        <div className="no-items">
          <h3>No items found</h3>
          <p>Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
};

export default Tabs;
