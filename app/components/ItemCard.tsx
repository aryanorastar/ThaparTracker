'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaMapMarkerAlt, FaCalendarAlt, FaTag } from 'react-icons/fa';

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
    lost: 'bg-red-100 text-red-800',
    found: 'bg-green-100 text-green-800',
    claimed: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="card hover:transform hover:scale-105 transition-all duration-200">
      <div className="relative">
        {item.image_url ? (
          <div className="h-48 w-full relative rounded-t-lg overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-gray-200 rounded-t-lg flex items-center justify-center">
            <span className="text-gray-400 text-lg">No Image</span>
          </div>
        )}
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold ${
            statusColors[item.status]
          }`}
        >
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 truncate">{item.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500">
            <FaTag className="mr-2" />
            <span>{item.category}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <FaCalendarAlt className="mr-2" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <Link
          href={`/items/${item.id}`}
          className="btn-primary w-full block text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
