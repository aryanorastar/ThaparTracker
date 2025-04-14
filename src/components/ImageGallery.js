import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ items }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Filter items that have image_url
  const itemsWithImages = items.filter(item => item.image_url);

  // Function to open the image modal
  const openImageModal = (item) => {
    setSelectedImage(item);
  };

  // Function to close the image modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Default images for categories when no image is provided
  const getCategoryDefaultImage = (category) => {
    const defaults = {
      electronics: '/images/default-electronics.svg',
      accessories: '/images/default-accessories.svg',
      books: '/images/default-books.svg',
      clothing: '/images/default-clothing.svg',
      other: '/images/default-other.svg'
    };
    
    return defaults[category] || '/images/default-item.svg';
  };

  // Get image URL with fallback to default category image
  const getImageUrl = (item) => {
    return item.image_url || getCategoryDefaultImage(item.category);
  };

  return (
    <div className="image-gallery-container">
      <h2 className="gallery-title">Recently Lost Items</h2>
      
      <div className="image-gallery">
        {items.length > 0 ? (
          items.map(item => (
            <div 
              key={item.id} 
              className="gallery-item" 
              onClick={() => openImageModal(item)}
            >
              <div className="gallery-item-image">
                <img 
                  src={getImageUrl(item)} 
                  alt={item.item_name}
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = '/images/default-item.svg';
                  }}
                />
              </div>
              <div className="gallery-item-info">
                <h3>{item.item_name}</h3>
                <p className="gallery-item-location">{item.location}</p>
                <p className="gallery-item-date">Lost on: {new Date(item.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-items-message">
            <p>No items to display</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeImageModal}>×</button>
            <div className="modal-image-container">
              <img 
                src={getImageUrl(selectedImage)} 
                alt={selectedImage.item_name}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/images/default-item.svg';
                }}
              />
            </div>
            <div className="modal-item-details">
              <h2>{selectedImage.item_name}</h2>
              <p className="modal-item-description">{selectedImage.description}</p>
              <div className="modal-item-info">
                <p><strong>Category:</strong> {selectedImage.category}</p>
                <p><strong>Location:</strong> {selectedImage.location}</p>
                <p><strong>Date Lost:</strong> {new Date(selectedImage.date).toLocaleDateString()}</p>
                {selectedImage.contact_info && (
                  <p>
                    <strong>Contact:</strong> 
                    <a href={`mailto:${selectedImage.contact_info}`}>
                      {selectedImage.contact_info}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
