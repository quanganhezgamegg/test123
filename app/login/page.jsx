'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import NewsletterSignup from '../component/flight/NewsletterSignup'; // Đảm bảo đường dẫn này đúng


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
 
  const handleLogin = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    if (res.ok) {
    const data = await res.json()
    const role = data?.user?.role

        if (role === 'admin') {
          window.location.href = '/admin'
         } else {
           window.location.href = '/'
        }
  } else {
      console.log('Đăng nhập thất bại')
    }
  };
  
  return (
    <>
      <div className="max-w-md mx-auto p-6 mt-10 mb-10 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-indigo-600">
          Đăng nhập
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Nhập địa chỉ email"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e)=> setEmail(e.target.value)}
              required
              
              value={email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Nhập mật khẩu"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e)=> setPassword(e.target.value)}
              required
             
              value={password}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-2 text-sm">
                <label
                  htmlFor="remember"
                  className="font-medium text-gray-900"
                >
                  Nhớ tài khoản
                </label>
              </div>
            </div>

            <div className="text-sm">
              <a
                href="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <a
              href="/register"
              className="font-medium text-indigo-600 hover:underline"
            >
              Đăng ký
            </a>
          </p>
        </div>
      </div>
      <NewsletterSignup />
    </>
  );
}

export default LoginPage;

