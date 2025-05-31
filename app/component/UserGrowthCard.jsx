'use client'
import { useEffect, useState } from 'react'

export default function UserGrowthCard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/stat/user-growth')
      const json = await res.json()
      setData(json)
    }

    fetchData()
  }, [])

  if (!data) return <div>Loading...</div>

  const { thisMonthCount, percentChange } = data
  const isIncrease = percentChange > 0
  const isNeutral = percentChange === 0

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Người dùng mới trong tháng</h2>
      <p className="text-3xl font-bold text-blue-600 mb-4">{thisMonthCount}</p>
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
