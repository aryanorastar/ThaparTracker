'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-primary-700 mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="bg-primary-700 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-primary-800 transition-colors"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
