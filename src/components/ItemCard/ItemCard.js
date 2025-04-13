import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  const statusClass = item.type === 'lost' ? 'status-lost' : 'status-found';
  const statusLabel = item.type === 'lost' ? 'Lost' : 'Found';
  
  // Format the date - handle different date formats
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // If invalid date, return original string
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  return (
    <div className="item-card">
      <div className={`item-status ${statusClass}`}>
        {statusLabel}
      </div>
      
      <div className="item-image-container">
        <img 
          src={item.image || 'https://via.placeholder.com/150'} 
          alt={item.name} 
          className="item-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/150';
          }}
        />
      </div>
      
      <div className="item-content">
        <h3 className="item-name">{item.name}</h3>
        
        <div className="item-meta">
          <div className="meta-item">
            <FaCalendarAlt className="meta-icon" />
            <span>{formatDate(item.date)}</span>
          </div>
          <div className="meta-item">
            <FaMapMarkerAlt className="meta-icon" />
            <span>{item.location}</span>
          </div>
        </div>
        
        <p className="item-description">
          {item.description 
            ? (item.description.length > 100 
                ? `${item.description.substring(0, 100)}...` 
                : item.description)
            : 'No description available'}
        </p>
        
        <Link to={`/item/${item.id}`} className="view-details-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
