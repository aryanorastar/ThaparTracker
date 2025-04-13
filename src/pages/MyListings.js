import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

// Mock user data - in a real app, this would come from authentication
const mockUserItems = [
  {
    id: '1',
    type: 'lost',
    name: 'MacBook Pro',
    description: 'Silver MacBook Pro 13" with stickers on the cover',
    category: 'electronics',
    date: '2025-04-12',
    location: 'Library, 2nd Floor',
    image: 'https://via.placeholder.com/150',
    status: 'active'
  },
  {
    id: '3',
    type: 'lost',
    name: 'Water Bottle',
    description: 'Blue Hydro Flask with stickers',
    category: 'accessories',
    date: '2025-04-10',
    location: 'Sports Complex',
    image: 'https://via.placeholder.com/150',
    status: 'active'
  },
];

const MyListings = () => {
  const [userItems, setUserItems] = useState(mockUserItems);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock authentication state

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setUserItems(userItems.filter(item => item.id !== id));
    }
  };

  const handleMarkAsResolved = (id) => {
    setUserItems(userItems.map(item => 
      item.id === id ? { ...item, status: 'resolved' } : item
    ));
  };

  if (!isLoggedIn) {
    return (
      <div className="login-required">
        <h2>Login Required</h2>
        <p>Please log in with your Thapar University email to view your listings.</p>
        <button className="login-button">Login with Google</button>
      </div>
    );
  }

  return (
    <div className="my-listings-container">
      <h1>My Listings</h1>
      
      {userItems.length === 0 ? (
        <div className="no-listings">
          <p>You haven't posted any items yet.</p>
          <Link to="/" className="post-item-button">Post an Item</Link>
        </div>
      ) : (
        <>
          <div className="listings-header">
            <p>Showing {userItems.length} items</p>
            <Link to="/" className="post-item-button">Post New Item</Link>
          </div>
          
          <div className="listings-table">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {userItems.map(item => (
                  <tr key={item.id} className={item.status === 'resolved' ? 'resolved-item' : ''}>
                    <td>
                      <img src={item.image} alt={item.name} className="item-thumbnail" />
                    </td>
                    <td>
                      <Link to={`/item/${item.id}`} className="item-name-link">
                        {item.name}
                      </Link>
                      <p className="item-description-preview">{item.description.substring(0, 30)}...</p>
                    </td>
                    <td>
                      <span className={`type-badge ${item.type}`}>
                        {item.type === 'lost' ? 'Lost' : 'Found'}
                      </span>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.location}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {item.status === 'active' ? 'Active' : 'Resolved'}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="edit-button"
                          onClick={() => console.log('Edit item', item.id)}
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="delete-button"
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          <FaTrash />
                        </button>
                        {item.status === 'active' && (
                          <button 
                            className="resolve-button"
                            onClick={() => handleMarkAsResolved(item.id)}
                          >
                            Mark as Resolved
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default MyListings;
