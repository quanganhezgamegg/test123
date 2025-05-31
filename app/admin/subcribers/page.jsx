'use client';
import { useEffect, useState } from 'react';

export default function NewslettersPage() {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    const fetchSubscribers = async () => {
      const res = await fetch('/api/subcribers');
      const data = await res.json();
      setSubscribers(data);
    };
    fetchSubscribers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Danh sách đăng ký nhận bản tin</h1>
      <div className="overflow-auto rounded shadow-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Ngày đăng ký</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-4">Không có dữ liệu</td>
              </tr>
            ) : (
              subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="border p-2">{sub.id}</td>
                  <td className="border p-2">{sub.email}</td>
                  <td className="border p-2">{new Date(sub.subscribed_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
