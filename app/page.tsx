import Link from 'next/link';
import { FaSearch, FaClipboardList, FaMapMarkerAlt } from 'react-icons/fa';
import ItemCard from '@/app/components/ItemCard';
import supabase from './lib/supabase';
import { HeroSpline, FloatingObjects, BackgroundAnimation } from './components/spline';

// Define a simple Item type to avoid TypeScript errors
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
  created_at: string;
}

async function getRecentItems(): Promise<Item[]> {
  const { data: items, error } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching items:', error);
    return [];
  }

  return items as Item[] || [];
}

export default async function Home() {
  const recentItems = await getRecentItems();

  return (
    <div className="space-y-12 relative">
      {/* Background Animation */}
      <BackgroundAnimation intensity="light" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700/90 to-primary-900/90 text-white py-20 px-4 rounded-xl shadow-2xl relative overflow-hidden backdrop-blur-sm">
        <div className="absolute inset-0 -z-10">
          <HeroSpline />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Thapar University Lost & Found
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
            A platform for Thapar University students and staff to report and find lost items on campus.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Link
              href="/items/lost"
              className="bg-white text-primary-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Lost Items
            </Link>
            <Link
              href="/items/found"
              className="bg-secondary-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-secondary-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Found Items
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
            How It Works
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary-500 rounded-full"></div>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:translate-y-[-10px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-primary-50 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-primary-100 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-primary-200 transition-colors">
                <FaSearch className="text-primary-600 text-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Search Items</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse through lost and found items or use the search feature to find specific items.
                </p>
              </div>
              <div className="absolute -bottom-16 -right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <FloatingObjects variant="search" className="w-32 h-32" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:translate-y-[-10px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-primary-50 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-primary-100 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-primary-200 transition-colors">
                <FaClipboardList className="text-primary-600 text-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Report Items</h3>
                <p className="text-gray-600 leading-relaxed">
                  Administrators can report lost or found items with details and optional images.
                </p>
              </div>
              <div className="absolute -bottom-16 -right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <FloatingObjects variant="items" className="w-32 h-32" />
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform transition-all duration-300 hover:translate-y-[-10px] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-primary-50 rounded-full opacity-70 group-hover:opacity-100 transition-opacity"></div>
              <div className="bg-primary-100 p-5 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 relative z-10 group-hover:bg-primary-200 transition-colors">
                <FaMapMarkerAlt className="text-primary-600 text-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3">Claim Items</h3>
                <p className="text-gray-600 leading-relaxed">
                  Contact the provided information to claim your lost item or return a found one.
                </p>
              </div>
              <div className="absolute -bottom-16 -right-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <FloatingObjects variant="map" className="w-32 h-32" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items Section */}
      <section className="py-16 bg-gray-50/80 backdrop-blur-sm rounded-2xl shadow-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
            Recent Items
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-secondary-500 rounded-full"></div>
          </h2>
          
          {recentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentItems.map((item: Item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">No items have been reported yet.</p>
          )}
          
          <div className="text-center mt-12">
            <Link
              href="/items"
              className="bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-md inline-flex items-center gap-2"
            >
              View All Items
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-secondary-500/90 to-secondary-600/90 text-white py-16 px-4 rounded-2xl shadow-2xl backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30">
          <FloatingObjects variant="items" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Lost Something?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto font-light">
            Check our database of found items or report your lost item to increase chances of recovery.
          </p>
          <Link
            href="/login"
            className="bg-white text-secondary-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center gap-2"
          >
            Admin Login
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
