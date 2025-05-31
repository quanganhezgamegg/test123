import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db'; // Đảm bảo đường dẫn này đúng

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'month'; // 'month' hoặc 'year'
    const type = searchParams.get('type');               // 'tour', 'flight', hoặc 'all'
    const year = searchParams.get('year');               // Năm cụ thể, ví dụ: '2024'

    // Kiểm tra xem năm có hợp lệ không, mặc định là năm hiện tại
    let targetYear = new Date().getFullYear();
    if (year && !isNaN(parseInt(year))) {
      targetYear = parseInt(year);
    }

    const db = await connectDB(); // Kết nối database

    let query = '';
    const queryParams = [targetYear]; // Bắt đầu với năm làm tham số đầu tiên

    // Xây dựng phần WHERE clause cho type
    let typeCondition = '';
    if (type && type !== 'all') {
      typeCondition = 'AND type = ?';
      queryParams.push(type); // Thêm type vào tham số truy vấn nếu không phải 'all'
    }

    // Xây dựng query SQL dựa trên filter (month/year)
    if (filter === 'month') {
      query = `
        SELECT 
          DATE_FORMAT(booking_date, '%Y-%m') AS name, 
          COUNT(*) AS count 
        FROM bookings
        WHERE YEAR(booking_date) = ? AND status = 'confirmed' ${typeCondition}
        GROUP BY name
        ORDER BY name ASC;
      `;
    } else if (filter === 'year') {
      query = `
        SELECT 
          YEAR(booking_date) AS name, 
          COUNT(*) AS count 
        FROM bookings
        WHERE status = 'confirmed' ${typeCondition}
        GROUP BY name
        ORDER BY name ASC;
      `;
    } else {
      // Xử lý trường hợp filter không hợp lệ
      await db.end(); // Đóng kết nối database trước khi trả về lỗi
      return NextResponse.json({ message: 'Tham số filter không hợp lệ.' }, { status: 400 });
    }

    // Thực thi truy vấn
    const [rows] = await db.execute(query, queryParams);

    // Đóng kết nối database
    await db.end();

    // Trả về dữ liệu JSON
    return NextResponse.json(rows);

  } catch (error) {
    console.error('Lỗi trong API /api/stat/booking:', error);
    // Xử lý lỗi và trả về phản hồi JSON với status 500
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi server khi lấy dữ liệu thống kê booking.', error: error.message },
      { status: 500 }
    );
  }
}