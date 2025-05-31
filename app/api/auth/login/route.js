// /app/api/auth/login/route.js
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import connectDB from '@/app/lib/db'
import { signToken } from '@/app/untils/jwt'
import { cookies } from 'next/headers'

export async function POST(req) {
  try {
    const { email, password } = await req.json()
    const pool = await connectDB()
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    const user = rows[0]
    
    if (!user) {
      return NextResponse.json({ message: 'Email không tồn tại' }, { status: 401 })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return NextResponse.json({ message: 'Sai mật khẩu' }, { status: 401 })
    }

    const token = signToken({ id: user.id, email: user.email,name: user.name, role: user.role })

    cookies().set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return NextResponse.json({
  message: 'Đăng nhập thành công',
  user: {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  },
});

  } catch (err) {
    console.error('LOGIN ERROR:', err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
