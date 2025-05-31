import  connectDB  from '@/app/lib/db';

export async function GET(req, { params }) {
  const db = await connectDB();
  const [rows] = await db.query('SELECT * FROM Flights WHERE id = ?', [params.id]);
  return Response.json(rows[0]);
}

export async function PUT(req, { params }) {
  const { flight_number, airline, origin, destination, departure_time, arrival_time } = await req.json();
  const db = await connectDB();
  await db.query(
    'UPDATE Flights SET flight_number = ?, airline = ?, origin = ?, destination = ?, departure_time = ?, arrival_time = ? WHERE id = ?',
    [flight_number, airline, origin, destination, departure_time, arrival_time, params.id]
  );
  return new Response('Flight updated', { status: 200 });
}

export async function DELETE(_, { params }) {
  const db = await connectDB();
  await db.query('DELETE FROM Flights WHERE id = ?', [params.id]);
  return new Response('Flight deleted', { status: 200 });
}
