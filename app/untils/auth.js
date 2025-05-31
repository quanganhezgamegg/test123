// utils/auth.js
import { cookies } from 'next/headers'
import { verifyToken } from './jwt'

export function getUserFromCookie() {
  const token = cookies().get('token')?.value
  if (!token) return null

  const decoded = verifyToken(token)
  return decoded || null
}

