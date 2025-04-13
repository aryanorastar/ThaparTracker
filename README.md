# Thapar University Lost and Found Website

A modern web application for Thapar University where administrators can add lost and found items through Supabase, and users can search and view these items.

## Features

- **Admin-Only Item Management**: Administrators add items directly through Supabase
- **Search & Filter**: Find items by category, location, date, and keywords
- **Lost vs Found Tabs**: Easily switch between viewing lost items, found items, or all items
- **Responsive Design**: Works on all devices
- **Supabase Integration**: For database and read-only frontend access
- **Netlify Deployment**: Easy deployment to production

## Tech Stack

- **Frontend**: React, Create React App
- **Database**: Supabase
- **Styling**: Custom CSS
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
3. Create a Supabase project and set up the database tables:

   **lost_items Table**
   - id (UUID, primary key)
   - item_name (text)
   - description (text)
   - category (text)
   - location (text)
   - date (date)
   - image_url (text, optional)
   - contact_info (text)
   - created_at (timestamp)

   **found_items Table**
   - id (UUID, primary key)
   - item_name (text)
   - description (text)
   - category (text)
   - location (text)
   - date (date)
   - image_url (text, optional)
   - contact_info (text)
   - created_at (timestamp)

4. Set up Row Level Security (RLS) in Supabase:
   ```sql
   -- For public/anonymous access (reading only)
   CREATE POLICY "Enable read access for all users" ON "public"."lost_items"
   AS PERMISSIVE FOR SELECT
   TO public
   USING (true);

   -- For admin-only access (creating, updating, deleting)
   CREATE POLICY "Enable full access for admins only" ON "public"."lost_items"
   AS PERMISSIVE FOR ALL
   TO authenticated
   USING (auth.uid() IN (SELECT id FROM admins));
   ```

5. Create a `.env` file with the following variables:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
6. Run the development server:
   ```
   npm start
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment to Netlify

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Add the environment variables in the Netlify dashboard:
   - REACT_APP_SUPABASE_URL
   - REACT_APP_SUPABASE_ANON_KEY
5. Deploy the site

## Admin Workflow

1. Administrators log into the Supabase dashboard
2. Navigate to the Table Editor
3. Add new items to either the `lost_items` or `found_items` table
4. The frontend will automatically display the new items

## License

This project is licensed under the MIT License.
