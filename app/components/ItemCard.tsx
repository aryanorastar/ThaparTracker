'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaCalendarAlt, FaTag, FaArrowRight } from 'react-icons/fa';

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: 'lost' | 'found' | 'claimed';
  image_url?: string;
  contact_info: string;
}

interface ItemCardProps {
  item: Item;
}

const ItemCard = ({ item }: ItemCardProps) => {
  // Format date
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Status badge color
  const statusColors = {
    lost: 'bg-red-100 text-red-800 border border-red-200',
    found: 'bg-green-100 text-green-800 border border-green-200',
    claimed: 'bg-blue-100 text-blue-800 border border-blue-200',
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:translate-y-[-8px] group">
      <div className="relative">
        {item.image_url ? (
          <div className="h-56 w-full relative overflow-hidden">
            {/* Using a div with background image as fallback for Image component */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.image_url})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ) : (
          <div className="h-56 w-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-lg font-medium">No Image Available</span>
          </div>
        )}
        <div
          className={`absolute top-3 right-3 px-4 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm ${
            statusColors[item.status]
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 truncate text-gray-800">{item.title}</h3>
        <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">{item.description}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center mr-3">
              <FaTag className="text-primary-500" />
            </div>
            <span className="font-medium">{item.category}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center mr-3">
              <FaMapMarkerAlt className="text-primary-500" />
            </div>
            <span className="font-medium">{item.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center mr-3">
              <FaCalendarAlt className="text-primary-500" />
            </div>
            <span className="font-medium">{formattedDate}</span>
          </div>
        </div>

        <Link
          href={`/items/${item.id}`}
          className="inline-flex items-center justify-center w-full bg-primary-600 text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-primary-700 transition-colors duration-300 gap-2 group-hover:gap-3"
        >
          View Details
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
