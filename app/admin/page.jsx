"use client";

import { useState } from 'react';
import StatBooking from '../component/statBooking';
import RevenueCard from '../component/RevenueCard';
import UserGrowthCard from '../component/UserGrowthCard';
// Tạo các components UI cơ bản
const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-lg shadow p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ title, subtitle }) => (
  <div className="mb-4">
    <h3 className="font-bold text-lg">{title}</h3>
    {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
  </div>
);

// Component chính
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Dữ liệu mẫu
  

  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Bảng điều khiển</h1>
        <div className="flex mt-4 space-x-4">
          {['overview'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </header>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <RevenueCard />
      <UserGrowthCard />
      </div>
     <div className='mt-4'>
      < StatBooking />
     </div>
       
    </div>
  );
}