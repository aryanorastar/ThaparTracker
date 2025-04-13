import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const TestConnection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Checking connection...');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setLoading(true);
      
      // Test the connection to Supabase
      const { data: testData, error: testError } = await supabase
        .from('items')
        .select('count()', { count: 'exact', head: true });
      
      if (testError) {
        throw new Error(`Connection error: ${testError.message}`);
      }
      
      setConnectionStatus(`Connected to Supabase successfully! Project ID: dbpytnlpgbuzibmnnvks`);
      
      // Now fetch some items
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .limit(5);
      
      if (error) {
        throw new Error(`Error fetching items: ${error.message}`);
      }
      
      console.log('Items fetched:', data);
      setItems(data || []);
      
    } catch (error) {
      console.error('Test connection error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Supabase Connection Test</h2>
      
      <div style={{ 
        padding: '15px', 
        backgroundColor: error ? '#ffebee' : '#e8f5e9', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h3>{error ? 'Connection Error' : 'Connection Status'}</h3>
        <p>{error || connectionStatus}</p>
        
        {error && (
          <button 
            onClick={testConnection}
            style={{
              backgroundColor: '#2a3f65',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Retry Connection
          </button>
        )}
      </div>
      
      {!error && (
        <>
          <h3>Items from Your Database</h3>
          {loading ? (
            <p>Loading items...</p>
          ) : items.length > 0 ? (
            <div>
              <p>Found {items.length} items in your table:</p>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {items.map(item => (
                  <li key={item.id} style={{ 
                    padding: '15px', 
                    backgroundColor: '#f5f5f5', 
                    marginBottom: '10px',
                    borderRadius: '4px',
                    borderLeft: `4px solid ${item.item_type === 'lost' ? '#f44336' : '#4caf50'}`
                  }}>
                    <h4 style={{ margin: '0 0 8px 0' }}>
                      {item.item_name} 
                      <span style={{ 
                        fontSize: '14px',
                        backgroundColor: item.item_type === 'lost' ? '#ffebee' : '#e8f5e9',
                        color: item.item_type === 'lost' ? '#c62828' : '#2e7d32',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        marginLeft: '10px'
                      }}>
                        {item.item_type}
                      </span>
                    </h4>
                    <p style={{ margin: '0 0 5px 0' }}><strong>Description:</strong> {item.description || 'No description'}</p>
                    <p style={{ margin: '0 0 5px 0' }}><strong>Category:</strong> {item.category || 'Uncategorized'}</p>
                    <p style={{ margin: '0 0 5px 0' }}><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                    <p style={{ margin: '0' }}><strong>Location:</strong> {item.location || 'Unknown'}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No items found in your database. Try adding some items first.</p>
          )}
        </>
      )}
      
      <div style={{ marginTop: '30px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
        <h3>Database Information</h3>
        <p><strong>Project ID:</strong> dbpytnlpgbuzibmnnvks</p>
        <p><strong>Table Name:</strong> items</p>
        <p><strong>Expected Schema:</strong></p>
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', overflow: 'auto' }}>
{`items (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE,
  item_type TEXT NOT NULL CHECK (item_type IN ('lost', 'found')),
  item_name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  date DATE NOT NULL,
  location TEXT,
  image_url TEXT,
  contact_info TEXT,
  status TEXT DEFAULT 'active'
)`}
        </pre>
      </div>
    </div>
  );
};

export default TestConnection;
