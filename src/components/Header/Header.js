import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock authentication state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">
            Thapar Lost & Found
          </Link>
        </div>

        <div className="mobile-menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            </li>
            <li>
              <Link to="/search" onClick={() => setIsMenuOpen(false)}>
                <FaSearch /> Search
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/my-listings" onClick={() => setIsMenuOpen(false)}>My Listings</Link>
                </li>
                <li>
                  <button 
                    className="auth-button logout-button"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button 
                  className="auth-button login-button"
                  onClick={() => {
                    setIsLoggedIn(true);
                    setIsMenuOpen(false);
                  }}
                >
                  <FaUser /> Login
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
