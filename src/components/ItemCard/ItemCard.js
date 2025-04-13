import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import './ItemCard.css';

const ItemCard = ({ item }) => {
  const statusClass = item.type === 'lost' ? 'status-lost' : 'status-found';
  const statusLabel = item.type === 'lost' ? 'Lost' : 'Found';

  return (
    <div className="item-card">
      <div className={`item-status ${statusClass}`}>
        {statusLabel}
      </div>
      
      <div className="item-image-container">
        <img src={item.image} alt={item.name} className="item-image" />
      </div>
      
      <div className="item-content">
        <h3 className="item-name">{item.name}</h3>
        
        <div className="item-meta">
          <div className="meta-item">
            <FaCalendarAlt className="meta-icon" />
            <span>{item.date}</span>
          </div>
          <div className="meta-item">
            <FaMapMarkerAlt className="meta-icon" />
            <span>{item.location}</span>
          </div>
        </div>
        
        <p className="item-description">{item.description.substring(0, 100)}...</p>
        
        <Link to={`/item/${item.id}`} className="view-details-button">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
