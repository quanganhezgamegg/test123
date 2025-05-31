'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AddFlight() {
  const router = useRouter()
  const [form, setForm] = useState({
    flight_number: '',
    airline: '',
    origin: '',
    destination: '',
    departure_time: '',
    arrival_time: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/flight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    router.push('/admin/flight')
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Thêm chuyến bay</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['flight_number', 'airline', 'origin', 'destination'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field.replace('_', ' ')}</label>
            <input type="text" name={field} value={form[field]} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
        ))}
        {['departure_time', 'arrival_time'].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field.replace('_', ' ')}</label>
            <input type="datetime-local" name={field} value={form[field]} onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Lưu</button>
      </form>
    </div>
  )
}
