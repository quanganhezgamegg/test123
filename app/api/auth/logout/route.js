
import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ message: 'Đã đăng xuất' })
  res.cookies.set('token', '', { maxAge: 0 }) // Xóa cookie
  return res
}
