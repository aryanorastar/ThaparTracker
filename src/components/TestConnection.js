import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const TestConnection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('Checking connection...');
  const [detailedStatus, setDetailedStatus] = useState({});

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setLoading(true);
      setDetailedStatus({});
      setError(null);
      
      // Step 1: Test basic Supabase connection
      console.log('Testing basic Supabase connection...');
      setConnectionStatus('Testing basic Supabase connection...');
      
      try {
        // Use a simple health check that doesn't require a specific table
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setDetailedStatus(prev => ({ ...prev, basicConnection: { success: false, error: error.message } }));
          throw new Error(`Basic connection error: ${error.message}`);
        }
        
        setDetailedStatus(prev => ({ ...prev, basicConnection: { success: true } }));
        setConnectionStatus('Successfully connected to Supabase API');
        console.log('Basic connection successful');
      } catch (healthError) {
        console.error('Health check error:', healthError);
        setDetailedStatus(prev => ({ ...prev, basicConnection: { success: false, error: healthError.message } }));
        throw new Error(`Basic connection error: ${healthError.message}`);
      }
      
      // Step 2: Check if the items table exists and get count
      console.log('Checking if items table exists...');
      setConnectionStatus('Checking if items table exists...');
      
      try {
        const { count, error } = await supabase
          .from('items')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          setDetailedStatus(prev => ({ ...prev, tableExists: { success: false, error: error.message } }));
          throw new Error(`Table access error: ${error.message}`);
        }
        
        setDetailedStatus(prev => ({ ...prev, tableExists: { success: true, count } }));
        setConnectionStatus(`Successfully connected to items table. Found ${count} items.`);
        console.log('Table exists check successful, count:', count);
      } catch (tableError) {
        console.error('Table check error:', tableError);
        setDetailedStatus(prev => ({ ...prev, tableExists: { success: false, error: tableError.message } }));
        throw new Error(`Table access error: ${tableError.message}`);
      }
      
      // Step 3: Check if we can query items
      console.log('Attempting to query items...');
      setConnectionStatus('Attempting to query items...');
      
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .limit(5);
        
        if (error) {
          setDetailedStatus(prev => ({ ...prev, queryItems: { success: false, error: error.message } }));
          throw new Error(`Query error: ${error.message}`);
        }
        
        console.log('Items fetched:', data);
        setItems(data || []);
        setDetailedStatus(prev => ({ ...prev, queryItems: { success: true, count: data.length } }));
        setConnectionStatus(`Successfully retrieved ${data.length} items from the database`);
      } catch (queryError) {
        console.error('Query error:', queryError);
        setDetailedStatus(prev => ({ ...prev, queryItems: { success: false, error: queryError.message } }));
        throw new Error(`Query error: ${queryError.message}`);
      }
      
    } catch (error) {
      console.error('Test connection error:', error);
      setError(error.message);
      setConnectionStatus('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  const renderDetailedStatus = () => {
    return (
      <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
        <h3>Detailed Connection Status</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <h4>1. Basic Supabase Connection</h4>
          {detailedStatus.basicConnection ? (
            detailedStatus.basicConnection.success ? (
              <p style={{ color: 'green' }}>✓ Successfully connected to Supabase API</p>
            ) : (
              <p style={{ color: 'red' }}>✗ Failed to connect to Supabase API: {detailedStatus.basicConnection.error}</p>
            )
          ) : (
            <p>Not tested yet</p>
          )}
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <h4>2. Table Existence Check</h4>
          {detailedStatus.tableExists ? (
            detailedStatus.tableExists.success ? (
              <p style={{ color: 'green' }}>✓ The 'items' table exists (Total items: {detailedStatus.tableExists.count})</p>
            ) : (
              <p style={{ color: 'red' }}>✗ Failed to access 'items' table: {detailedStatus.tableExists.error}</p>
            )
          ) : (
            <p>Not tested yet</p>
          )}
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <h4>3. Query Items</h4>
          {detailedStatus.queryItems ? (
            detailedStatus.queryItems.success ? (
              <p style={{ color: 'green' }}>✓ Successfully queried items (Found {detailedStatus.queryItems.count} items)</p>
            ) : (
              <p style={{ color: 'red' }}>✗ Failed to query items: {detailedStatus.queryItems.error}</p>
            )
          ) : (
            <p>Not tested yet</p>
          )}
        </div>
      </div>
    );
  };

  const addSampleItem = async () => {
    try {
      setLoading(true);
      
      const newItem = {
        item_type: 'lost', // Using lowercase 'lost' to match constraint
        item_name: 'Sample Item ' + new Date().toLocaleTimeString(),
        description: 'This is a sample item created from the test interface',
        category: 'electronics',
        date: new Date().toISOString().split('T')[0],
        location: 'Thapar University',
        contact_info: 'test@example.com'
      };
      
      const { data, error } = await supabase
        .from('items')
        .insert(newItem)
        .select();
      
      if (error) {
        alert(`Error adding sample item: ${error.message}`);
        console.error('Error adding sample item:', error);
      } else {
        alert('Sample item added successfully!');
        console.log('Sample item added:', data);
        testConnection(); // Refresh the connection test
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error('Error:', error);
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
        
        <div style={{ display: 'flex', gap: '10px' }}>
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
            disabled={loading}
          >
            {loading ? 'Testing...' : 'Retry Connection'}
          </button>
          
          {!error && !loading && (
            <button 
              onClick={addSampleItem}
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Add Sample Item
            </button>
          )}
        </div>
      </div>
      
      {renderDetailedStatus()}
      
      {!error && !loading && items.length > 0 && (
        <>
          <h3>Items from Your Database</h3>
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
        </>
      )}
      
      <div style={{ marginTop: '30px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
        <h3>Next Steps</h3>
        <p>Now that you've confirmed your Supabase connection, you can:</p>
        <ol>
          <li>Use the "Add Sample Item" button to add a test item to your database</li>
          <li>Implement the full Lost Items page with the table view</li>
          <li>Add a form for users to report lost items</li>
        </ol>
        <p>Would you like to proceed with implementing the full Lost Items page?</p>
      </div>
    </div>
  );
};

export default TestConnection;
