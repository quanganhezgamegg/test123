import { cookies } from 'next/headers';
import { jwtVerify } from 'jose'; //
import Header from './component/Header'; 
import Footer from './component/Footer'; 
import { getUserFromCookie } from './untils/auth';

import './globals.css';

const JWT_SECRET_KEY = process.env.JWT_SECRET ; // Đảm bảo đây là biến môi trường của bạn
const secretKey = new TextEncoder().encode(JWT_SECRET_KEY);



export default async function RootLayout({ children }) {
  const user = getUserFromCookie(); // Lấy thông tin người dùng từ cookie
  // Xác định xem có phải route admin không
  const pathname = cookies().get('pathname')?.value || '';  //Lỗi cũ ở đây
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col">
        {!isAdminRoute && <Header user={user} />}
        <main className="my-28">{children}</main>
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}
