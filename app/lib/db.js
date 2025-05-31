// lib/db.js
import mysql from 'mysql2/promise';

const dbConfig = {
  host:  'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD ,
  database: process.env.MYSQL_DATABASE ,
};

let pool;

async function connectDB() { // Không có 'export' ở đây
  if (!pool) {
    try {
      pool = mysql.createPool(dbConfig);
      console.log('Kết nối thành công đến cơ sở dữ liệu (sử dụng pool)!');
    } catch (error) {
      console.error('Lỗi khởi tạo connection pool:', error);
      throw error;
    }
  }
  return pool;
}

export default connectDB; // Default export ở cuối file