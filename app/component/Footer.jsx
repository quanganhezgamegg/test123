'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 py-10 border-t  ">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-start">
        
        {/* Logo + Mô tả */}
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold text-black mb-4">Jadoo</h2>
          <p className="text-sm text-gray-500">
          Khám phá những chuyến đi trong mơ của bạn cùng chúng tôi — đặt vé nhanh chóng, tận hưởng những
           chuyến đi tuyệt vời và tiết kiệm thời gian và tiền bạc
          </p>
        </div>

        {/* Company */}
        <div className="w-1/2 sm:w-1/4 mb-8 md:mb-0">
          <h3 className="font-semibold text-gray-900 mb-4">Côny ty chúng tôi</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:underline">Về chúng tôi</Link></li>
            <li><Link href="/mobile" className="hover:underline">Điện Thoại</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-1/2 sm:w-1/4 mb-8 md:mb-0">
          <h3 className="font-semibold text-gray-900 mb-4">Liên Hệ</h3>
          <ul className="space-y-2">
            <li><Link href="/help" className="hover:underline">Trợ giúp</Link></li>
            <li><Link href="/press" className="hover:underline">Nhấn</Link></li>
            <li><Link href="/affiliates" className="hover:underline">Các chi nhánh</Link></li>
          </ul>
        </div>

        {/* More */}
        

          {/* Mạng xã hội */}
          <div className="flex space-x-4 mt-6">
            <Link href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Image src="/icons/facebook.svg" alt="Facebook" width={16} height={16} />
            </Link>
            <Link href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Image src="/icons/instagram.svg" alt="Instagram" width={16} height={16} />
            </Link>
            <Link href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Image src="/icons/twitter.svg" alt="Twitter" width={16} height={16} />
            </Link>
          </div>

          

        </div>
        <div className="container mx-auto text-center mt-10 mb-0 ">
        <p className="text-sm">
          © {new Date().getFullYear()} Trang web của tôi. Mọi quyền được bảo lưu.
        </p>
      </div>
    </footer>
  )
}
