import connectDB  from '@/app/lib/db';

export async function GET() {
  const db = await connectDB();
  const [rows] = await db.query('SELECT * FROM Bookings');
  return Response.json(rows);
}

export async function POST(req) {
  const { user_id, type, tour_id, flight_ticket_id, total_price, status } = await req.json();
  const db = await connectDB();
  await db.query(
    'INSERT INTO Bookings (user_id, type, tour_id, flight_ticket_id, total_price, status) VALUES (?, ?, ?, ?, ?, ?)',
    [user_id, type, tour_id || null, flight_ticket_id || null, total_price, status || 'pending']
  );
  return new Response('Booking created', { status: 201 });
}
