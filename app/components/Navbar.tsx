'use client';

import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';

interface NavbarProps {
  session: any;
}

const Navbar = ({ session }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Thapar Lost & Found
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary-200 transition-colors">
              Home
            </Link>
            <Link href="/items/lost" className="hover:text-primary-200 transition-colors">
              Lost Items
            </Link>
            <Link href="/items/found" className="hover:text-primary-200 transition-colors">
              Found Items
            </Link>
            {session?.user?.role === 'admin' && (
              <Link href="/admin/dashboard" className="hover:text-primary-200 transition-colors">
                Admin Dashboard
              </Link>
            )}
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-white text-primary-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-white text-primary-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="hover:bg-primary-600 px-3 py-2 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/items/lost"
                className="hover:bg-primary-600 px-3 py-2 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Lost Items
              </Link>
              <Link
                href="/items/found"
                className="hover:bg-primary-600 px-3 py-2 rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Found Items
              </Link>
              {session?.user?.role === 'admin' && (
                <Link
                  href="/admin/dashboard"
                  className="hover:bg-primary-600 px-3 py-2 rounded transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-white text-primary-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-left"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="bg-white text-primary-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors text-left"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
