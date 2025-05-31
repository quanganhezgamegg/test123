'use client';
import React from 'react';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default  function Header({ user }) {
  const router = useRouter()
  

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/') // quay về trang chính
    router.refresh() // refresh lại layout
  }

  return (
    <header className="bg-white text-black shadow-md font-sans fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="flex items-center text-2xl font-bold">
            Jado<span className="text-yellow-400">oo</span>
          </div>
        </Link>
        {/* Menu */}
        <nav className="flex gap-8 items-center">
          <Link href="/tour" className="hover:text-yellow-500">
            Điểm đến
          </Link>
          <Link href="/flight" className="hover:text-yellow-500">
            Các chuyến bay
          </Link>
          <Link href="/about" className="hover:text-yellow-500">
            Về chúng tôi
          </Link>
          <Link href="/blog" className="hover:text-yellow-500">
            Cẩm nang du lịch
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex flex-row gap-4 items-center">
              <span className="">Chào, {user.name}</span> 
              <button onClick={handleLogout} className="hover:underline  flex items-center gap-2">
                Đăng xuất
                <LogOut className="" />
              </button>
            </div>
          ) : (
            <div className='flex gap-4 flex-row justify-between items-center'>
              <Link href="/login" className="bg-white text-black border px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-white transition">
                Đăng nhập
              </Link>
              <Link
                href="/register"
                className="border px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-white transition"
              >
                Đăng kí
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

