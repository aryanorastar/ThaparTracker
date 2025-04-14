import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import LostItemsTable from './pages/LostItemsTable';
import { supabase } from './utils/supabaseClient';
// Import Spline components with error boundaries
const HeroSpline = React.lazy(() => import('./components/spline/HeroSpline'));
const FloatingObjects = React.lazy(() => import('./components/spline/FloatingObjects'));
const BackgroundAnimation = React.lazy(() => import('./components/spline/BackgroundAnimation'));

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Spline component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Wrapper for Spline components with fallback
const SafeSpline = ({ component: Component, fallback, ...props }) => {
  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback || <div className="spline-loading"></div>}>
        <Component {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

function App() {
  const [dbStatus, setDbStatus] = useState({ checked: false, success: false, message: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        // Check if the items table exists
        const { count, error } = await supabase
          .from('items')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          throw error;
        }
        
        setDbStatus({
          checked: true,
          success: true,
          message: `Database connected successfully! Found ${count} items.`
        });
      } catch (error) {
        console.error('Error checking database:', error);
        setDbStatus({
          checked: true,
          success: false,
          message: 'Failed to connect to database. Please make sure the "items" table exists.'
        });
      } finally {
        setLoading(false);
      }
    };

    checkDatabase();
  }, []);

  if (loading) {
    return (
      <div className="loading-screen bg-gradient-to-r from-blue-900 to-indigo-900 flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-24 h-24 mb-8">
          {/* Simple loading animation instead of Spline */}
          <div className="loading-animation"></div>
        </div>
        <div className="loading-spinner"></div>
        <p className="text-white text-xl mt-6 font-light">Connecting to database...</p>
      </div>
    );
  }

  if (!dbStatus.success) {
    return (
      <div className="db-error-screen bg-gradient-to-r from-blue-900 to-indigo-900 flex flex-col items-center justify-center min-h-screen p-6 text-center">
        <div className="relative w-24 h-24 mb-8 opacity-50">
          {/* Simple error icon instead of Spline */}
          <div className="error-icon"></div>
        </div>
        <h2 className="text-white text-3xl font-bold mb-4">Database Connection Error</h2>
        <p className="text-blue-200 text-xl mb-4">{dbStatus.message}</p>
        <p className="text-blue-200 mb-8">Please ensure the database table is set up correctly using the provided SQL script.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="App relative">
      {/* Background Animation with fallback */}
      <SafeSpline 
        component={BackgroundAnimation} 
        intensity="light"
        fallback={<div className="fallback-background"></div>}
      />
      
      {/* Hero Section */}
      <div className="hero-section relative overflow-hidden bg-gradient-to-r from-blue-700/90 to-indigo-900/90 text-white py-20 px-4 rounded-xl shadow-2xl mb-12">
        <div className="absolute inset-0 -z-10">
          <SafeSpline 
            component={HeroSpline}
            fallback={<div className="fallback-hero-bg"></div>}
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Thapar University Lost & Found
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
            A platform for Thapar University students and staff to report and find lost items on campus.
          </p>
        </div>
      </div>
      
      <LostItemsTable />
    </div>
  );
}

export default App;
