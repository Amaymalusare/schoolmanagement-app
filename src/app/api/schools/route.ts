import { NextRequest, NextResponse } from 'next/server';
import { getPool, initDatabase } from '@/lib/db';

// GET - Fetch all schools
export async function GET() {
  try {
    await initDatabase();
    const [rows] = await getPool().execute('SELECT * FROM schools ORDER BY created_at DESC');
    
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schools' },
      { status: 500 }
    );
  }
}

// POST - Create a new school
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, address, city, state, contact, email_id, image } = body;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate contact number (should be 10 digits)
    const contactRegex = /^\d{10}$/;
    if (!contactRegex.test(contact)) {
      return NextResponse.json(
        { success: false, error: 'Contact number should be 10 digits' },
        { status: 400 }
      );
    }

    await initDatabase();
    const [result] = await getPool().execute(
      'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, email_id, image || null]
    );

    return NextResponse.json({
      success: true,
      message: 'School added successfully',
      data: { id: (result as any).insertId }
    });
  } catch (error) {
    console.error('Error creating school:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create school' },
      { status: 500 }
    );
  }
}
