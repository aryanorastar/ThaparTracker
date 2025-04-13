# Thapar University Lost and Found Website

A modern web application for Thapar University where administrators can add, manage, and track lost and found items.

## Features

- **Admin Authentication**: Secure login system for administrators
- **Item Management**: Add, update, and delete lost and found items
- **Search & Filter**: Find items by status, category, and more
- **Responsive Design**: Works on all devices
- **Supabase Integration**: For database and authentication
- **Netlify Deployment**: Easy deployment to production

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase
- **Authentication**: NextAuth.js with Supabase
- **Deployment**: Netlify

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- Netlify account

### Local Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a Supabase project and set up the database using the `supabase-schema.sql` file
4. Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=http://localhost:3000
   ```
5. Run the development server:
   ```
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment to Netlify

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add the environment variables in the Netlify dashboard:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL (your Netlify URL)
5. Deploy the site

## Database Schema

### Users Table
- id (UUID, primary key)
- name (text)
- email (text, unique)
- password (text, hashed)
- role (text: 'admin' or 'user')
- created_at (timestamp)
- updated_at (timestamp)

### Items Table
- id (UUID, primary key)
- title (text)
- description (text)
- category (text)
- location (text)
- date (timestamp)
- status (text: 'lost', 'found', or 'claimed')
- image_url (text, optional)
- contact_info (text)
- created_by (UUID, foreign key to users)
- created_at (timestamp)
- updated_at (timestamp)

## License

This project is licensed under the MIT License.
