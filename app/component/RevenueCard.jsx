'use client'
import { useEffect, useState } from 'react'

export default function RevenueCard() {
  const [data, setData] = useState(null)

 useEffect(() => {
  const fetchRevenue = async () => {
    try {
      const res = await fetch('/api/stat/revenue-percent');

      if (!res.ok) {
        console.error('Lỗi server:', res.status);
        return;
      }

      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Lỗi fetch revenue:', err);
    }
  };

  fetchRevenue();
}, []);


  if (!data) return <div>Loading...</div>

  const { thisMonthRevenue, percentChange } = data

  const isIncrease = percentChange > 0
  const isNeutral = percentChange === 0

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Doanh thu tháng này</h2>
      <p className="text-3xl font-bold text-blue-600 mb-4">
        {thisMonthRevenue.toLocaleString('vi-VN')} ₫
      </p>
      <p
        className={`text-sm font-medium ${
          isNeutral
            ? 'text-gray-500'
            : isIncrease
            ? 'text-green-600'
            : 'text-red-600'
        }`}
      >
        {isNeutral
          ? 'Không thay đổi so với tháng trước'
          : `${isIncrease ? '↑ Tăng' : '↓ Giảm'} ${Math.abs(percentChange)}% so với tháng trước`}
      </p>
    </div>
  )
}
