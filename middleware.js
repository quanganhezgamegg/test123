import { NextResponse } from 'next/server'
import { verifyToken } from './app/untils/jwt'

export function middleware(req) {
  const token = req.cookies.get('token')?.value
  console.log('MIDDLEWARE: token =', token)

  if (!token) {
    console.log('MIDDLEWARE: No token found')
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    verifyToken(token)
  } catch (err) {
    console.error('MIDDLEWARE: Token verify failed:', err)
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
