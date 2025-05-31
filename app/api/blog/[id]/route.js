import connectDB  from '@/app/lib/db';

export async function GET(req, { params }) {
  const { id } = params;
  const db = await connectDB();
  try {
    const [rows] = await db.execute('SELECT * FROM blogposts WHERE id = ?', [id]);

    if (rows.length === 0) {
      return NextResponse.json({ message: 'Không tìm thấy bài viết' }, { status: 404 });
    }
    console.log('Truy vấn với id:', id);
    console.log('Kết quả trả về:', rows);
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết blog:', error);
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
 
}
export async function DELETE(req, { params }) {
  const id = params.id;
    const db = await connectDB();
  try {
    if (!id) {
      return new Response(JSON.stringify({ error: 'Thiếu ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Thực thi truy vấn xoá
    await db.query('DELETE FROM blogposts WHERE id = ?', [id]);

    return new Response(JSON.stringify({ message: 'Xoá thành công' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Lỗi khi xoá blog:', err);
    return new Response(JSON.stringify({ error: 'Lỗi khi xoá blog' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
