// app/api/tours/route.js
import { NextResponse } from 'next/server'
import  connectDB  from '@/app/lib/db';

// GET all tours
export async function GET() {
  try {
     const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM tours ORDER BY created_at DESC')
    return NextResponse.json(rows)
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy danh sách tour' }, { status: 500 })
  }
}

// POST: create new tour
export async function POST(req) {
  try {
     const db = await connectDB();
    const data = await req.json()
    const {
      title, slug, description, location,
      price, duration, image, discount_percentage
    } = data

    const [result] = await db.query(
      `INSERT INTO tours 
       (title, slug, description, location, price, duration, image, discount_percentage, created_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [title, slug, description, location, price, duration, image, discount_percentage]
    )

    return NextResponse.json({ message: 'Tour đã được tạo', id: result.insertId })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi tạo tour' }, { status: 500 })
  }
}
