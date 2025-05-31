'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function FlightList() {
  const [flights, setFlights] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/flight')
      .then(res => res.json())
      .then(data => setFlights(data))
  }, [])

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xoá flight này?')) {
      await fetch(`/api/flight/${id}`, { method: 'DELETE' })
      setFlights(flights.filter(f => f.id !== id))
    }
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Danh sách Flights</h1>
        <button onClick={() => router.push('/admin/flight/add')} className="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm mới
        </button>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Số hiệu</th>
            <th className="border px-2 py-1">Hãng</th>
            <th className="border px-2 py-1">Điểm đi</th>
            <th className="border px-2 py-1">Điểm đến</th>
            <th className="border px-2 py-1">Khởi hành</th>
            <th className="border px-2 py-1">Đến nơi</th>
            <th className="border px-2 py-1">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={flight.id} className="border hover:bg-gray-50">
              <td className="border px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">{flight.flight_number}</td>
              <td className="border px-2 py-1">{flight.airline}</td>
              <td className="border px-2 py-1">{flight.origin}</td>
              <td className="border px-2 py-1">{flight.destination}</td>
              <td className="border px-2 py-1">{flight.departure_time}</td>
              <td className="border px-2 py-1">{flight.arrival_time}</td>
              <td className="border px-2 py-1 space-x-2">
                <button onClick={() => router.push(`/admin/flight/${flight.id}`)} className="bg-yellow-500 text-white px-2 py-1 rounded">Sửa</button>
                <button onClick={() => handleDelete(flight.id)} className="bg-red-500 text-white px-2 py-1 rounded">Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
