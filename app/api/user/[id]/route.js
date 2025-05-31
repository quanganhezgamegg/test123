import connectDB from '@/app/lib/db';

export async function GET(req, { params }) {
  const db = await connectDB();
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [params.id]);
  return Response.json(rows[0]);
}

export async function PUT(req, { params }) {
  const { name, email, phoneNumber } = await req.json();
  const db = await connectDB();
  await db.query('UPDATE users SET name = ?, email = ?,phoneNumber=? WHERE id = ?', [name, email,phoneNumber, params.id]);
  return new Response('User updated', { status: 200 });
}

export async function DELETE(_, { params }) {
  const db = await connectDB();
  await db.query('DELETE FROM users WHERE id = ?', [params.id]);
  return new Response('User deleted', { status: 200 });
}
