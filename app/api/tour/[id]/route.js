// app/api/tours/[id]/route.js
import { NextResponse } from 'next/server'
import connectDB from '@/app/lib/db'

// GET by ID
export async function GET(_, { params }) {
  try {
    const db = await connectDB()
    const [rows] = await db.query('SELECT * FROM tours WHERE id = ?', [params.id])
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Tour không tồn tại' }, { status: 404 })
    }
    return NextResponse.json(rows[0])
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi lấy tour' }, { status: 500 })
  }
}

// PUT: Update
export async function PUT(req, { params }) {
  try {
    const db = await connectDB()
    const data = await req.json()
    const {
      title, slug, description, location,
      price, duration, image, discount_percentage
    } = data

    const [result] = await db.query(
      `UPDATE tours SET 
       title=?, slug=?, description=?, location=?, price=?, duration=?, image=?, discount_percentage=?
       WHERE id=?`,
      [title, slug, description, location, price, duration, image, discount_percentage, params.id]
    )

    return NextResponse.json({ message: 'Tour đã được cập nhật' })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi cập nhật tour' }, { status: 500 })
  }
}

// DELETE
export async function DELETE(_, { params }) {
  try {
    const db = await connectDB()
    const [rows] = await db.query('DELETE  FROM tours WHERE id = ?', [params.id])
    return NextResponse.json({ message: 'Tour đã được xoá' })
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi khi xoá tour' }, { status: 500 })
  }
}
