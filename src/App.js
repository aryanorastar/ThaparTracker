import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Header from './components/Header/Header';
import Home from './pages/Home';
import ItemDetails from './pages/ItemDetails';
import MyListings from './pages/MyListings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetails />} />
            <Route path="/my-listings" element={<MyListings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          <p> {new Date().getFullYear()} Thapar University Lost and Found</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
