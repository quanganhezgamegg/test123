import  connectDB  from '@/app/lib/db';

export async function GET() {
  try {
    const db = await connectDB();
    const [rows] = await db.query('SELECT * FROM Flights');
    if (rows.length === 0) {
      return new Response('No flights found', { status: 404 });
    }
    // Check if the rows are empty
    return Response.json(rows);
  } catch (error) {
    console.error('GET /api/flight error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(req) {
  const { flight_number, airline, origin, destination, departure_time, arrival_time } = await req.json();
  const db = await connectDB();
  await db.query(
    'INSERT INTO Flights (flight_number, airline, origin, destination, departure_time, arrival_time) VALUES (?, ?, ?, ?, ?, ?)',
    [flight_number, airline, origin, destination, departure_time, arrival_time]
  );
  return new Response('Flight created', { status: 201 });
}
