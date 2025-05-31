'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NewsletterSignup from '../component/flight/NewsletterSignup';
export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
    // role :''
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      router.push('/login');
    } else {
      alert('Đăng ký thất bại');
    }
  };

  return (
  <>
    <div className="max-w-md mx-auto p-4 mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
  <div>
    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Họ và tên</label>
    <input
      type="text"
      name="name"
      id="name"
      placeholder="Nhập họ và tên"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      onChange={handleChange}
      required
    />
  </div>
  <div>
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      placeholder="Nhập địa chỉ email"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      onChange={handleChange}
      required
    />
  </div>
  <div>
    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Số điện thoại</label>
    <input
      type="tel"
      name="phoneNumber"
      id="phoneNumber"
      placeholder="Nhập số điện thoại"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      onChange={handleChange}
      required
    />
  </div>
  <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
    <input
      type="password"
      name="password"
      id="password"
      placeholder="Nhập mật khẩu"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      onChange={handleChange}
      required
    />
  </div>
  {/* <div>
    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Chức vụ</label>
    <input
      type="text"
      name="role"
      id="role"
      placeholder="User"
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      onChange={handleChange}
      required
    />
  </div> */}
  <div>
    <button
      type="submit"
      className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      Đăng ký
    </button>
  </div>
</form>
    </div>
    <div className="text-center mt-4">
      <p className="text-gray-600">Đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a></p></div>
    <NewsletterSignup />
  </>
  );
}
