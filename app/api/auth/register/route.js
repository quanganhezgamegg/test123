import  connectDB  from '@/app/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { name, email,phoneNumber, password } = await req.json();
  const db = await connectDB();

  const [existing] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  if (existing.length > 0) {
    return Response.json({ message: 'Email already registered' }, { status: 400 });
  }

  const hash = await bcrypt.hash(password, 10);
  await db.query('INSERT INTO Users (name, email,phoneNumber, password) VALUES (?,?, ?,?)', [name, email,phoneNumber, hash]);

  return Response.json({ message: 'User registered' });
}
