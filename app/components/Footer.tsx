'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { FloatingObjects } from './spline';

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-primary-900 to-primary-800 text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 opacity-10 w-96 h-96 -mt-24 -mr-24">
        <FloatingObjects variant="items" />
      </div>
      <div className="absolute bottom-0 left-0 opacity-10 w-96 h-96 -mb-24 -ml-24 transform rotate-180">
        <FloatingObjects variant="map" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative w-10 h-10 overflow-hidden">
                <div className="absolute inset-0 scale-75">
                  <FloatingObjects variant="items" />
                </div>
              </div>
              <h3 className="text-2xl font-bold">Thapar Lost & Found</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              A platform for Thapar University students and staff to report and
              find lost items on campus. We help connect people with their lost belongings.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-secondary-500 after:rounded-full">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-secondary-500 rounded-full transform transition-transform duration-300 group-hover:scale-150"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/items/lost"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-secondary-500 rounded-full transform transition-transform duration-300 group-hover:scale-150"></span>
                  <span>Lost Items</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/items/found"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-secondary-500 rounded-full transform transition-transform duration-300 group-hover:scale-150"></span>
                  <span>Found Items</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-2 h-2 bg-secondary-500 rounded-full transform transition-transform duration-300 group-hover:scale-150"></span>
                  <span>Admin Login</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-secondary-500 after:rounded-full">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-white/10 p-2 rounded-full mt-1">
                  <FaMapMarkerAlt size={16} className="text-secondary-400" />
                </div>
                <span className="text-gray-300">
                  Thapar University, Patiala<br />
                  Punjab, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <FaEnvelope size={16} className="text-secondary-400" />
                </div>
                <a href="mailto:lostandfound@thapar.edu" className="text-gray-300 hover:text-white transition-colors">
                  lostandfound@thapar.edu
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <FaPhone size={16} className="text-secondary-400" />
                </div>
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white transition-colors">
                  +91 123 456 7890
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-secondary-500 after:rounded-full">
              Stay Updated
            </h3>
            <p className="text-gray-300">
              Subscribe to our newsletter to get updates on lost and found items.
            </p>
            <form className="mt-4 flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 text-white placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500"
              />
              <button
                type="submit"
                className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              &copy; {currentYear} Thapar University Lost & Found. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
