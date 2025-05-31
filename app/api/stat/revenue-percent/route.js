import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db'; // Đảm bảo đường dẫn này đúng

export async function GET() {
  let db; // Khai báo biến db ở ngoài try block để có thể truy cập trong finally

  try {
    db = await connectDB(); // Kết nối database

    const now = new Date();
    // Lấy tháng và năm hiện tại. getMonth() trả về 0-11, nên +1 để có 1-12
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    // Tính toán tháng và năm của tháng trước
    let previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    let previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

    // --- Truy vấn doanh thu tháng hiện tại ---
    const [thisMonthRows] = await db.execute(
      `
      SELECT SUM(total_price) AS revenue
      FROM bookings
      WHERE status = 'confirmed'
        AND MONTH(booking_date) = ?
        AND YEAR(booking_date) = ?
      `,
      [currentMonth, currentYear]
    );

    // --- Truy vấn doanh thu tháng trước ---
    const [lastMonthRows] = await db.execute(
      `
      SELECT SUM(total_price) AS revenue
      FROM bookings
      WHERE status = 'confirmed'
        AND MONTH(booking_date) = ?
        AND YEAR(booking_date) = ?
      `,
      [previousMonth, previousYear]
    );

    // Lấy giá trị doanh thu, mặc định là 0 nếu không có dữ liệu
    const thisMonthRevenue = parseFloat(thisMonthRows[0]?.revenue || 0);
    const lastMonthRevenue = parseFloat(lastMonthRows[0]?.revenue || 0);

    let percentChange = 0;
    if (lastMonthRevenue === 0) {
      // Nếu tháng trước không có doanh thu
      if (thisMonthRevenue > 0) {
        percentChange = 100; // Tăng 100% (từ 0 lên một số dương)
      } else {
        percentChange = 0; // Cả hai đều 0, không thay đổi
      }
    } else {
      // Tính phần trăm thay đổi thông thường
      percentChange = ((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
    }

    // Trả về kết quả JSON với số thập phân được làm tròn
    return NextResponse.json({
      thisMonthRevenue,
      lastMonthRevenue,
      percentChange: parseFloat(percentChange.toFixed(2)), // Làm tròn đến 2 chữ số thập phân
    });

  } catch (error) {
    // Bắt và xử lý mọi lỗi xảy ra trong quá trình thực thi
    console.error('Lỗi trong API /api/stat/revenue-percent:', error);
    // Trả về phản hồi lỗi JSON với status 500
    return NextResponse.json(
      { message: 'Đã xảy ra lỗi server khi tính toán doanh thu.', error: error.message },
      { status: 500 }
    );
  } finally {
    // Đảm bảo kết nối database được đóng, bất kể có lỗi hay không
    if (db) {
      await db.end();
    }
  }
}