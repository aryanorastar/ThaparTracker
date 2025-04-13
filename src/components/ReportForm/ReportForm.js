import React, { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import './ReportForm.css';

const ReportForm = ({ onItemAdded }) => {
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    category: 'electronics',
    date: new Date().toISOString().split('T')[0],
    location: '',
    contact_info: '',
    image_url: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Always set item_type to 'lost' for this form
      const itemData = {
        ...formData,
        item_type: 'lost' // Explicitly using lowercase 'lost' to match constraint
      };
      
      console.log('Submitting item with data:', itemData);
      
      const { data, error } = await supabase
        .from('items')
        .insert(itemData)
        .select();
      
      if (error) {
        console.error('Error inserting item:', error);
        throw error;
      }
      
      console.log('Item added successfully:', data);
      setSuccess(true);
      setFormData({
        item_name: '',
        description: '',
        category: 'electronics',
        date: new Date().toISOString().split('T')[0],
        location: '',
        contact_info: '',
        image_url: ''
      });
      
      // Notify parent component that a new item was added
      if (onItemAdded) onItemAdded();
      
    } catch (error) {
      setError(error.message || 'Failed to report item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="report-form-container">
      <h2>Report a Lost Item</h2>
      
      {success && (
        <div className="success-message">
          <p>Item reported successfully! Thank you.</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="item_name">Item Name *</label>
          <input
            type="text"
            id="item_name"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            required
            placeholder="e.g., MacBook Pro, Student ID Card"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about the item..."
            rows="3"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="electronics">Electronics</option>
              <option value="id-cards">ID Cards</option>
              <option value="accessories">Accessories</option>
              <option value="books">Books</option>
              <option value="clothing">Clothing</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date Lost *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Where was the item lost?"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="contact_info">Contact Email *</label>
          <input
            type="email"
            id="contact_info"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            required
            placeholder="Your email address"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="image_url">Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            placeholder="URL to an image of the item (optional)"
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Report Lost Item'}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
