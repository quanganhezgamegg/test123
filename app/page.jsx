import './globals.css';
import React from 'react';
import Image from 'next/image';
import TourListPreview from './component/home/TopTourPreview';
import CustomerTestimonials from './component/home/CustomerTestimonials';
import FeatureHighlights from './component/home/FeatureHighlights';
import NewsletterSignup from './component/home/NewsletterSignup';
// import FeaturedBlogs from './component/home/FeaturedBlogs';
const Home = () => {
  return (
 

    <>

    {      /* Hero Section */}
    <section className="relative w-full h-screen">

      {/* Background Image */}
      <Image
        src="/image/banners/banner1.jpg"
        width={1920}
        height={1080}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover"
        
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Text Content */}
      <div className="absolute top-1/3 left-12 max-w-xl text-white">
        <h1 className="text-5xl font-bold leading-tight mb-4">
        Lên kế hoạch cho chuyến đi của bạn <br /> 
        </h1>
        <p className="mb-6 text-lg">Once in a life time experience!</p>
        <button className="bg-white text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 hover:text-white transition">
          Tìm hiểu thêm
        </button>
      </div>

      {/* Search Form */}
      <div className="absolute bottom-8 text-black font-sans left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl">
        <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-4">

          {/* Select Destination */}
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <span>🏝️</span>
            <select className="outline-none">
              <option>Điểm đến</option>
            </select>
          </div>

          {/* Select Activities */}
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <span>🎯</span>
            <select className="outline-none">
              <option>Hoạt động</option>
            </select>
          </div>

          {/* Select Budget */}
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <span>💰</span>
            <select className="outline-none">
              <option>Ngân sách</option>
            </select>
          </div>

          {/* Select Duration */}
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <span>⏳</span>
            <select className="outline-none">
              <option>Khoảng thời gian</option>
            </select>
          </div>

          {/* Choose a Date */}
          <div className="flex items-center gap-2 flex-1 min-w-[120px]">
            <span>📅</span>
            <select className="outline-none">
              <option>Chọn ngày</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500 transition">
            🔍
          </button>

        </div>
      </div>
    </section>
    <TourListPreview /> 
    <FeatureHighlights />
    <CustomerTestimonials />
    {/* <FeaturedBlogs /> */}
    <NewsletterSignup />
    </>
  );
}

 
export default Home;

