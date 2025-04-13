import Link from 'next/link';
import { FaSearch, FaClipboardList, FaMapMarkerAlt } from 'react-icons/fa';
import ItemCard from '@/app/components/ItemCard';
import supabase from './lib/supabase';

async function getRecentItems() {
  const { data: items, error } = await supabase
    .from('items')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching items:', error);
    return [];
  }

  return items || [];
}

export default async function Home() {
  const recentItems = await getRecentItems();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16 px-4 rounded-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Thapar University Lost & Found
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            A platform for Thapar University students and staff to report and find lost items on campus.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link
              href="/items/lost"
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Browse Lost Items
            </Link>
            <Link
              href="/items/found"
              className="bg-secondary-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-secondary-600 transition-colors"
            >
              Browse Found Items
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Search Items</h3>
              <p className="text-gray-600">
                Browse through lost and found items or use the search feature to find specific items.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaClipboardList className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Report Items</h3>
              <p className="text-gray-600">
                Administrators can report lost or found items with details and optional images.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt className="text-primary-600 text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2">Claim Items</h3>
              <p className="text-gray-600">
                Contact the provided information to claim your lost item or return a found one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Items Section */}
      <section className="py-12 bg-gray-50 rounded-lg">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Items</h2>
          
          {recentItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No items have been reported yet.</p>
          )}
          
          <div className="text-center mt-8">
            <Link
              href="/items"
              className="btn-primary inline-block"
            >
              View All Items
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary-500 text-white py-12 px-4 rounded-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Lost Something?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Check our database of found items or report your lost item to increase chances of recovery.
          </p>
          <Link
            href="/login"
            className="bg-white text-secondary-500 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </section>
    </div>
  );
}
