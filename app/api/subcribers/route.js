import connectDB from "@/app/lib/db";

export async function GET() {
  try {
    // Kết nối cơ bản – thay thông tin của bạn vào
    const pool = await connectDB();
    const [rows] = await pool.execute('SELECT * FROM newslettersubscribers ORDER BY subscribed_at DESC');
    await pool.end();
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new Response(JSON.stringify({ message: 'Error fetching subscribers' }), {
      status: 500,
    });
  }
}
export async function POST(req) {
  try {
    const { email } = await req.json();
    const pool = await connectDB();
    

    // Kiểm tra email đã tồn tại chưa
    const [existing] = await pool.query(
      'SELECT * FROM newslettersubscribers WHERE email = ?',
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json({ message: 'Email đã tồn tại trong hệ thống.' }, { status: 409 }); // 409 = Conflict
    }

    const subscribed_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const [result] = await pool.query(
      'INSERT INTO newslettersubscribers (email, subscribed_at) VALUES (?, ?)',
      [email, subscribed_at]
    );

    return NextResponse.json({ message: 'Đăng ký thành công', id: result.insertId }, { status: 201 });
  } catch (err) {
    console.error('Lỗi server:', err);
    return NextResponse.json({ message: 'Lỗi server nội bộ' }, { status: 500 });
  }
}