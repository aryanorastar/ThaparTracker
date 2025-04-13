import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/lib/supabase';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/lib/auth';

// GET item by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const { data: item, error } = await supabase
      .from('items')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 });
  }
}

// PUT update item
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    const data = await request.json();
    
    // Update item in Supabase
    const { data: item, error } = await supabase
      .from('items')
      .update({
        ...data,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error || !item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }
    
    return NextResponse.json(item, { status: 200 });
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

// DELETE item
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = params;
    
    // Delete item from Supabase
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id);
    
    if (error) {
      return NextResponse.json({ error: 'Item not found or could not be deleted' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Item deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
