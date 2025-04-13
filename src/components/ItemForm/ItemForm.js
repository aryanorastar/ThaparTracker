import React, { useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import './ItemForm.css';

const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'books', label: 'Books & Notes' },
  { value: 'id-cards', label: 'ID Cards' },
  { value: 'keys', label: 'Keys' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'other', label: 'Other' },
];

const locations = [
  { value: 'library', label: 'Library' },
  { value: 'cafeteria', label: 'Cafeteria' },
  { value: 'academic-block', label: 'Academic Block' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'sports-complex', label: 'Sports Complex' },
  { value: 'other', label: 'Other' },
];

const ItemForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'lost',
    name: '',
    description: '',
    category: '',
    date: '',
    location: '',
    image: null,
    contact: '',
    contactNumber: '',
    isAnonymous: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      if (errors.image) {
        setErrors({
          ...errors,
          image: null,
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.location) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.isAnonymous && !formData.contact) {
      newErrors.contact = 'Contact information is required unless anonymous';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="item-form-container">
      <h2 className="form-title">
        {formData.type === 'lost' ? 'Report a Lost Item' : 'Report a Found Item'}
      </h2>
      
      <form onSubmit={handleSubmit} className="item-form">
        <div className="form-type-toggle">
          <label className={`type-option ${formData.type === 'lost' ? 'active' : ''}`}>
            <input
              type="radio"
              name="type"
              value="lost"
              checked={formData.type === 'lost'}
              onChange={handleChange}
            />
            <span>I Lost an Item</span>
          </label>
          <label className={`type-option ${formData.type === 'found' ? 'active' : ''}`}>
            <input
              type="radio"
              name="type"
              value="found"
              checked={formData.type === 'found'}
              onChange={handleChange}
            />
            <span>I Found an Item</span>
          </label>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Item Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Blue Backpack"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date*</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location*</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={errors.location ? 'error' : ''}
            >
              <option value="">Select a location</option>
              {locations.map(location => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
            {errors.location && <span className="error-message">{errors.location}</span>}
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide details about the item..."
            rows="4"
            className={errors.description ? 'error' : ''}
          ></textarea>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <div className="image-upload-container">
            <div className="image-upload-area">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-placeholder">
                  <FaUpload />
                  <span>Click to upload</span>
                </div>
              )}
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
              />
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="contact">Email*</label>
            <input
              type="email"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Your email address"
              className={errors.contact ? 'error' : ''}
              disabled={formData.isAnonymous}
            />
            {errors.contact && <span className="error-message">{errors.contact}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="contactNumber">Phone Number</label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Your phone number"
              disabled={formData.isAnonymous}
            />
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="isAnonymous"
              checked={formData.isAnonymous}
              onChange={handleChange}
            />
            <span>Report Anonymously</span>
          </label>
          <p className="help-text">
            If checked, your contact information will not be visible to others.
          </p>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
