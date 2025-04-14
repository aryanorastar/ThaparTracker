'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSearch, FaUserCircle } from 'react-icons/fa';
import { FloatingObjects } from './spline';

interface NavbarProps {
  session: any;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
    // Reset search
    setShowSearch(false);
    setSearchQuery('');
  };

  // Mock signIn and signOut functions since next-auth might not be set up
  const signIn = () => {
    console.log('Sign in clicked');
    // Redirect to login page or show login modal
    window.location.href = '/login';
  };

  const signOut = () => {
    console.log('Sign out clicked');
    // Clear session and redirect
    window.location.href = '/';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 text-gray-800 shadow-lg backdrop-blur-md py-2' 
        : 'bg-transparent text-white py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className={`text-xl font-bold flex items-center gap-2 ${
              scrolled ? 'text-primary-700' : 'text-white'
            }`}>
              <div className="relative w-8 h-8 overflow-hidden">
                <div className="absolute inset-0 scale-75">
                  <FloatingObjects variant="items" />
                </div>
              </div>
              Thapar Lost & Found
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium hover:text-primary-500 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/items/lost" 
              className={`font-medium hover:text-primary-500 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Lost Items
            </Link>
            <Link 
              href="/items/found" 
              className={`font-medium hover:text-primary-500 transition-colors ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Found Items
            </Link>
            {session?.user?.role === 'admin' && (
              <Link 
                href="/admin/dashboard" 
                className={`font-medium hover:text-primary-500 transition-colors ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                Admin Dashboard
              </Link>
            )}
            
            <button 
              onClick={toggleSearch}
              className={`p-2 rounded-full hover:bg-primary-100/30 transition-colors ${
                scrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white'
              }`}
            >
              <FaSearch size={18} />
            </button>
            
            {session ? (
              <div className="relative group">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    scrolled 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                  }`}
                >
                  <FaUserCircle size={18} />
                  <span>Account</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 transform origin-top scale-95 group-hover:scale-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className={`px-5 py-2 rounded-xl font-medium transition-all duration-300 ${
                  scrolled 
                    ? 'bg-primary-600 text-white hover:bg-primary-700' 
                    : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                }`}
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 focus:outline-none ${scrolled ? 'text-gray-800' : 'text-white'}`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {showSearch && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 z-50">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search for items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-4 text-lg text-gray-800 focus:outline-none"
                  autoFocus
                />
                <div className="absolute right-0 top-0 h-full flex items-center pr-4">
                  <button type="submit" className="text-primary-600 hover:text-primary-800 p-2">
                    <FaSearch size={20} />
                  </button>
                  <button 
                    type="button" 
                    onClick={toggleSearch} 
                    className="text-gray-500 hover:text-gray-700 p-2 ml-1"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-primary-900/95 z-40 backdrop-blur-sm pt-16">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-white text-lg font-medium px-4 py-3 rounded-xl hover:bg-primary-800/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/items/lost"
                  className="text-white text-lg font-medium px-4 py-3 rounded-xl hover:bg-primary-800/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Lost Items
                </Link>
                <Link
                  href="/items/found"
                  className="text-white text-lg font-medium px-4 py-3 rounded-xl hover:bg-primary-800/50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Found Items
                </Link>
                {session?.user?.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="text-white text-lg font-medium px-4 py-3 rounded-xl hover:bg-primary-800/50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                
                <div className="pt-4 border-t border-primary-800/50">
                  {session ? (
                    <div className="space-y-3">
                      <div className="px-4 py-2">
                        <p className="text-primary-300 text-sm">Signed in as</p>
                        <p className="text-white font-medium truncate">{session.user?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-white text-lg font-medium rounded-xl bg-primary-800/50 hover:bg-primary-800 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        signIn();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-white text-lg font-medium rounded-xl bg-primary-800/50 hover:bg-primary-800 transition-colors"
                    >
                      Login
                    </button>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    toggleSearch();
                  }}
                  className="flex items-center gap-3 text-white text-lg font-medium px-4 py-3 rounded-xl hover:bg-primary-800/50 transition-colors"
                >
                  <FaSearch size={18} />
                  Search Items
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
