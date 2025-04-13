import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/lib/supabase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';

// GET all items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    // Initialize Supabase query
    let query = supabase.from('items').select('*');
    
    // Add filters if provided
    if (status) {
      query = query.eq('status', status);
    }
    
    if (category) {
      query = query.eq('category', category);
    }
    
    // Execute query and order by created_at
    const { data: items, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}

// POST new item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Insert new item into Supabase
    const { data: newItem, error } = await supabase
      .from('items')
      .insert({
        ...data,
        created_by: session.user.id,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
