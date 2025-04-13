import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaEnvelope, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import { supabase } from '../utils/supabaseClient';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        
        // Try to find the item in lost_items table
        const { data: lostItem, error: lostError } = await supabase
          .from('lost_items')
          .select('*')
          .eq('id', id)
          .single();
        
        if (lostItem) {
          setItem({
            ...lostItem,
            type: 'lost',
            name: lostItem.item_name || 'Unnamed Item',
            date: lostItem.date_lost || lostItem.created_at,
            image: lostItem.image_url || 'https://via.placeholder.com/500x300',
            contact: lostItem.contact_info || '',
            contactNumber: lostItem.contact_number || ''
          });
          setLoading(false);
          return;
        }
        
        // If not found in lost_items, try found_items
        const { data: foundItem, error: foundError } = await supabase
          .from('found_items')
          .select('*')
          .eq('id', id)
          .single();
        
        if (foundItem) {
          setItem({
            ...foundItem,
            type: 'found',
            name: foundItem.item_name || 'Unnamed Item',
            date: foundItem.date_found || foundItem.created_at,
            image: foundItem.image_url || 'https://via.placeholder.com/500x300',
            contact: foundItem.contact_info || '',
            contactNumber: foundItem.contact_number || ''
          });
          setLoading(false);
          return;
        }
        
        // If not found in either table
        if (!lostItem && !foundItem) {
          setError('Item not found');
        }
      } catch (error) {
        console.error('Error fetching item details:', error);
        setError('Failed to load item details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchItemDetails();
  }, [id]);

  // Format the date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading item details...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="item-not-found">
        <h2>Item Not Found</h2>
        <p>{error || "The item you're looking for doesn't exist or has been removed."}</p>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    );
  }

  const statusLabel = item.type === 'lost' ? 'Lost' : 'Found';
  const statusClass = item.type === 'lost' ? 'status-lost' : 'status-found';
  const dateLabel = item.type === 'lost' ? 'Date Lost' : 'Date Found';

  return (
    <div className="item-details-container">
      <div className="item-details-header">
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to listings
        </Link>
        <span className={`status-badge ${statusClass}`}>{statusLabel}</span>
      </div>

      <div className="item-details-content">
        <div className="item-image-container">
          <img 
            src={item.image} 
            alt={item.name} 
            className="item-image" 
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/500x300';
            }}
          />
        </div>

        <div className="item-info">
          <h1 className="item-name">{item.name}</h1>
          
          <div className="item-meta">
            <div className="meta-item">
              <FaCalendarAlt className="meta-icon" />
              <span><strong>{dateLabel}:</strong> {formatDate(item.date)}</span>
            </div>
            <div className="meta-item">
              <FaMapMarkerAlt className="meta-icon" />
              <span><strong>Location:</strong> {item.location || 'Unknown'}</span>
            </div>
            {item.category && (
              <div className="meta-item">
                <FaTag className="meta-icon" />
                <span><strong>Category:</strong> {item.category}</span>
              </div>
            )}
          </div>

          <div className="item-description">
            <h3>Description</h3>
            <p>{item.description || 'No description provided.'}</p>
          </div>

          {(item.contact || item.contactNumber) && (
            <div className="contact-section">
              <h3>Contact Information</h3>
              <div className="contact-buttons">
                {item.contact && (
                  <a href={`mailto:${item.contact}`} className="contact-button email-button">
                    <FaEnvelope /> Email
                  </a>
                )}
                {item.contactNumber && (
                  <a 
                    href={`https://wa.me/${item.contactNumber.replace(/\s+/g, '')}`} 
                    className="contact-button whatsapp-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}
          
          {!item.contact && !item.contactNumber && (
            <div className="contact-section">
              <h3>Contact Information</h3>
              <p>
                To inquire about this item, please email the Lost and Found office at{' '}
                <a href="mailto:lostfound@thapar.edu">lostfound@thapar.edu</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
