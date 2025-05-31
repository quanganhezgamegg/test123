'use client'
import { useEffect, useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts'

export default function BookingChart() {
  const [data, setData] = useState([])
  const [filter, setFilter] = useState('month')
  const [type, setType] = useState('tour')

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/stat/booking?filter=${filter}&type=${type}`)
      const json = await res.json()
      console.log(json);
      setData(json.map(item => ({
        label: filter === 'month' ? `Tháng ${item.label}` : `Năm ${item.label}`,
        count: item.count
      })))
    }
    fetchData()
  }, [filter, type])

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Thống kê  </h2>
        <div className="flex gap-4">
          <select
  className="
    block
    w-full
    px-4
    py-2
    pr-8             {/* Tạo khoảng trống cho mũi tên tùy chỉnh */}
    leading-tight
    bg-white
    border border-gray-300
    rounded-md
    shadow-sm        {/* Thêm đổ bóng nhẹ */}
    focus:outline-none
    focus:ring-2     {/* Hiệu ứng khi focus */}
    focus:ring-blue-500
    focus:border-blue-500
    appearance-none  {/* Ẩn mũi tên mặc định của trình duyệt */}
    text-gray-700
    cursor-pointer
  "
  value={type}
  onChange={e => setType(e.target.value)}
>
  
  <option value="tour">Tour</option>
  <option value="flight">Vé máy bay</option>
</select>

          <select
            className="border rounded px-2 py-1"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="month">Theo tháng</option>
            <option value="year">Theo năm</option>
          </select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3182ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
