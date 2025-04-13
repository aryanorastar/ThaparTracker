import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/app/lib/supabase';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user in Supabase
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        role: role || 'user', // Default to 'user' if role not specified
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Remove password from response
    if (user) {
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      
      return NextResponse.json(userResponse, { status: 201 });
    }
    
    throw new Error('Failed to create user');
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
}
