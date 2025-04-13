import React from 'react';
import './Tabs.css';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs-container">
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => onTabChange('all')}
        >
          All Items
        </button>
        <button 
          className={`tab ${activeTab === 'lost' ? 'active' : ''}`}
          onClick={() => onTabChange('lost')}
        >
          Lost Items
        </button>
        <button 
          className={`tab ${activeTab === 'found' ? 'active' : ''}`}
          onClick={() => onTabChange('found')}
        >
          Found Items
        </button>
      </div>
    </div>
  );
};

export default Tabs;
