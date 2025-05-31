import Link from "next/link";
import '../globals.css';
import { ChartColumn,File,Mail } from 'lucide-react';
export const metadata = {
    title: 'Admin Panel - Travel Website',
    description: 'Trang quản lý hệ thống tour và vé máy bay',
  };
  
  export default function AdminLayout({ children }) {
    return (
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md px-4 py-6">
          <h2 className="text-xl font-bold text-blue-600 mb-6">Travel Admin</h2>
          <nav className="flex flex-col space-y-4 text-gray-700">
            <Link href="/admin" className="hover:text-blue-500">📊 Dashboard</Link>
            <Link href="/admin/tour" className="hover:text-blue-500">🗺️ Quản lý Tour</Link>
            <Link href="/admin/flight" className="hover:text-blue-500">✈️ Quản lý Vé máy bay</Link>
            <Link href="/admin/user" className="hover:text-blue-500">👤 Quản lý Người dùng</Link>
            <Link href="/admin/subcribers" className="hover:text-blue-500 flex flex-row"> <Mail className="size-5" /> <span className="ml-1.5">Email đăng kí </span></Link>
            <Link href="/admin/blog" className="hover:text-blue-500 flex flex-row"><File className="size-5" />  <span className="ml-1.5">Quản lý Blog</span></Link>
            <Link href="/admin/booking" className="hover:text-blue-500 flex flex-row"><ChartColumn className="size-5" />  <span className="ml-1.5" >Thống kê đặt hàng</span></Link>
            <Link href="/" className="text-sm mt-6 text-gray-500 hover:text-blue-500">← Về trang chính</Link>
          </nav>
        </aside>
  
        {/* Main content */}
        <main className="flex-1 p-6 text-black font-sans">  
          {children}
        </main>
      </div>
    );
  }
  