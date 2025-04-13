import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import ReportForm from '../components/ReportForm/ReportForm';
import './LostItems.css';

const LostItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      setLoading(true);
      
      // Query only lost items from the items table
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('item_type', 'lost') // Using lowercase 'lost' to match the constraint
        .order('created_at', { ascending: false });
      
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

  const toggleReportForm = () => {
    setShowReportForm(!showReportForm);
  };

  const handleItemAdded = () => {
    fetchLostItems(); // Refresh the list after adding a new item
  };

  return (
    <div className="lost-items-container">
      <header>
        <h1>Thapar University Lost Items</h1>
        <p>Browse the list of reported lost items</p>
      </header>

      <div className="report-section">
        <button 
          className="toggle-form-button" 
          onClick={toggleReportForm}
        >
          {showReportForm ? 'Hide Report Form' : 'Report a Lost Item'}
        </button>
        
        {!showReportForm && (
          <p className="report-info">
            You can also report a lost item by email: <a href="mailto:lostandfound@thapar.edu">lostandfound@thapar.edu</a>
          </p>
        )}
      </div>

      {showReportForm && (
        <ReportForm onItemAdded={handleItemAdded} />
      )}

      {loading ? (
        <div className="loading">Loading lost items...</div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchLostItems}>Try Again</button>
        </div>
      ) : (
        <div className="items-table-container">
          {items.length > 0 ? (
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date Lost</th>
                  <th>Location</th>
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
              <p>No lost items found at this time.</p>
              <p>Check back later or report a lost item using the form above.</p>
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

export default LostItems;
