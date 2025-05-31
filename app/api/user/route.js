
import connectDB from '@/app/lib/db';
export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM users');
    return Response.json(rows);
  } catch (error) {
    console.error('GET /api/user error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
export async function POST(req) {
  const { name, email, password, role,phoneNumber } = await req.json();
  const db = await connectDB();
  await db.query(
    'INSERT INTO Users (name, email, password, role,phoneNumber) VALUES (?, ?, ?, ?,?)',
    [name, email, password, role,phoneNumber || 'user']
  );
  return new Response('User created', { status: 201 });
}


