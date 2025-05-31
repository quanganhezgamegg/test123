"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


// Component UI cơ bản
const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg overflow-hidden">
      {children}
    </table>
  </div>
);

const Button = ({ children, onClick, variant = 'primary' }) => {
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50'
  };
  
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md transition-colors ${variants[variant]}`}
    >
      {children}
    </button>
  );
};

// Component chính
export default function TourManagement() {
  const router = useRouter();
  // Dữ liệu mẫu
  const [tours, setTours] = useState([]);
  useEffect(() => {
  fetch('/api/tour')
    .then(res => res.json())
    .then(data => setTours(data));
}, []);

  
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    duration: '',
    status: 'active'
  });

  // Xử lý form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentTour) {
      // Cập nhật tour
      setTours(tours.map(t => t.id === currentTour.id ? { ...formData, id: currentTour.id } : t));
    } else {
      // Thêm tour mới
      const newTour = { ...formData, id: tours.length + 1 };
      setTours([...tours, newTour]);
    }
    
    setIsModalOpen(false);
    setCurrentTour(null);
    setFormData({
      title: '',
      location: '',
      price: '',
      duration: '',
      status: 'active'
    });
  };

  const handleEdit = (tour) => {
    setCurrentTour(tour);
    setFormData({
      title: tour.title,
      location: tour.location,
      price: tour.price,
      duration: tour.duration,
      status: tour.status
    });
    setIsModalOpen(true);
  };

 const handleDelete = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xoá tour này?')) return;

  try {
    const res = await fetch(`/api/tour/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok) {
      alert('Xoá tour thành công!');
      router.refresh();
      // Cập nhật danh sách tour sau khi xoá
      // Gợi ý: Gọi lại API hoặc cập nhật danh sách tour tại đây
      // Ví dụ: fetchTours(); hoặc setTours(tours.filter(t => t.id !== id))
    } else {
      console.error('Xoá thất bại:', data.error);
      alert(`Xoá thất bại: ${data.error || 'Lỗi không xác định'}`);
    }
  } catch (error) {
    console.error('Lỗi khi xoá:', error);
    alert('Đã xảy ra lỗi khi xoá tour');
  }
};


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Tour</h1>
        <Link href="/admin/tour/addtour">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4">
          Thêm mới Tour
        </button>
      </Link>
      </div>

      {/* Bảng danh sách tour */}
      <div className="bg-white rounded-lg shadow p-6">
        <Table>
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Tên Tour</th>
              <th className="py-3 px-4 text-left">Địa điểm</th>
              <th className="py-3 px-4 text-left">Giá</th>
              <th className="py-3 px-4 text-left">Thời lượng</th>
              <th className="py-3 px-4 text-left">Giảm giá</th>
              <th className="py-3 px-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tours.map(tour => (
              <tr key={tour.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">{tour.id}</td>
                <td className="py-3 px-4 font-medium">{tour.title}</td>
                <td className="py-3 px-4">{tour.location}</td>
                <td className="py-3 px-4">{tour.price.toLocaleString()} VNĐ</td>
                <td className="py-3 px-4">{tour.duration}</td>
                <td className="py-3 px-4">
                  {tour.discount_percentage ? `${tour.discount_percentage}%` : 'Không có'}
                </td>
                <td className="py-3 px-4 space-x-2">
                  
                  <Link href={`/admin/tour/${tour.id}`}>
                    <Button variant="outline">Sửa</Button>
                  </Link>
                  
                  <Button variant="danger" onClick={() => handleDelete(tour.id)}>Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal thêm/sửa tour */}
     
    </div>
  );
}