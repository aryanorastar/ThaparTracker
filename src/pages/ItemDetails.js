import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

// Mock data - in a real app, this would come from an API
const mockItems = [
  {
    id: '1',
    type: 'lost',
    name: 'MacBook Pro',
    description: 'Silver MacBook Pro 13" with stickers on the cover. Last seen in the library while studying for exams. Has a distinctive red case and a Thapar sticker on the lid.',
    category: 'electronics',
    date: '2025-04-12',
    location: 'Library, 2nd Floor',
    image: 'https://via.placeholder.com/500x300',
    contact: 'john.doe@thapar.edu',
    contactNumber: '+91 98765 43210'
  },
  {
    id: '2',
    type: 'found',
    name: 'Student ID Card',
    description: 'Thapar University ID Card for Rahul Kumar. Found near the cafeteria entrance.',
    category: 'id-cards',
    date: '2025-04-13',
    location: 'Cafeteria',
    image: 'https://via.placeholder.com/500x300',
    contact: 'jane.smith@thapar.edu',
    contactNumber: '+91 98765 12345'
  },
  {
    id: '3',
    type: 'lost',
    name: 'Water Bottle',
    description: 'Blue Hydro Flask with stickers. Has a dent on the bottom and a Thapar University logo sticker.',
    category: 'accessories',
    date: '2025-04-10',
    location: 'Sports Complex',
    image: 'https://via.placeholder.com/500x300',
    contact: 'amit.patel@thapar.edu',
    contactNumber: '+91 87654 32109'
  },
];

const ItemDetails = () => {
  const { id } = useParams();
  const item = mockItems.find(item => item.id === id);

  if (!item) {
    return (
      <div className="item-not-found">
        <h2>Item Not Found</h2>
        <p>The item you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>
    );
  }

  const statusLabel = item.type === 'lost' ? 'Lost' : 'Found';
  const statusClass = item.type === 'lost' ? 'status-lost' : 'status-found';

  return (
    <div className="item-details-container">
      <div className="item-details-header">
        <Link to="/" className="back-link">← Back to listings</Link>
        <span className={`status-badge ${statusClass}`}>{statusLabel}</span>
      </div>

      <div className="item-details-content">
        <div className="item-image-container">
          <img src={item.image} alt={item.name} className="item-image" />
        </div>

        <div className="item-info">
          <h1 className="item-name">{item.name}</h1>
          
          <div className="item-meta">
            <div className="meta-item">
              <FaCalendarAlt className="meta-icon" />
              <span>{item.date}</span>
            </div>
            <div className="meta-item">
              <FaMapMarkerAlt className="meta-icon" />
              <span>{item.location}</span>
            </div>
            <div className="meta-item">
              <FaTag className="meta-icon" />
              <span>{item.category}</span>
            </div>
          </div>

          <div className="item-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="contact-section">
            <h3>Contact Information</h3>
            <div className="contact-buttons">
              <a href={`mailto:${item.contact}`} className="contact-button email-button">
                <FaEnvelope /> Email
              </a>
              <a href={`https://wa.me/${item.contactNumber.replace(/\s+/g, '')}`} className="contact-button whatsapp-button">
                <FaWhatsapp /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
