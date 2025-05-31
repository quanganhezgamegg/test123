import connectDB  from '@/app/lib/db';
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = searchParams.get('limit')

    const pool = await connectDB()

    let query = 'SELECT id, title, slug, content, image_url, created_at FROM blogposts ORDER BY created_at DESC'
    let params = []

    if (limit) {
      query += ' LIMIT ?'
      params.push(Number(limit))
    }

    const [rows] = await pool.query(query, params)

    return NextResponse.json(rows)
  } catch (error) {
    console.error('Error fetching blogposts:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
export async function POST(req) {
  try {
    const db = await connectDB();
    const body = await req.json();
    const { title, slug, content, image_url } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await db.execute(
      'INSERT INTO blogposts (title, slug, content, image_url) VALUES (?, ?, ?, ?)',
      [title, slug, content, image_url || null]
    );

    return NextResponse.json({ message: 'Blog created successfully' });
  } catch (error) {
    console.error('POST blog error:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
