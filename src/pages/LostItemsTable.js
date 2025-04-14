import React, { useState } from 'react';
import './LostItemsTable.css';

const LostItemsTable = ({ items }) => {
  const [sortField, setSortField] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Sort items locally
  const getSortedItems = () => {
    return [...items].sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];
      
      // Handle dates
      if (sortField === 'date' || sortField === 'created_at') {
        valueA = new Date(valueA || 0);
        valueB = new Date(valueB || 0);
      }
      
      // Handle strings
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (field) => {
    // If clicking the same field, toggle direction
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
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

  const sortedItems = getSortedItems();

  return (
    <div className="lost-items-container">
      <h2 className="table-title">Detailed Items List</h2>
      
      {items.length === 0 ? (
        <div className="no-items">
          <p>No items found matching your search criteria.</p>
        </div>
      ) : (
        <div className="items-table-wrapper">
          <table className="items-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('item_name')}>
                  Item Name {renderSortIndicator('item_name')}
                </th>
                <th onClick={() => handleSort('description')}>
                  Description {renderSortIndicator('description')}
                </th>
                <th onClick={() => handleSort('category')}>
                  Category {renderSortIndicator('category')}
                </th>
                <th onClick={() => handleSort('date')}>
                  Date Lost {renderSortIndicator('date')}
                </th>
                <th onClick={() => handleSort('location')}>
                  Location {renderSortIndicator('location')}
                </th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map(item => (
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
        </div>
      )}

      <footer>
        <p>&copy; {new Date().getFullYear()} Thapar University Lost and Found</p>
      </footer>
    </div>
  );
};

export default LostItemsTable;
