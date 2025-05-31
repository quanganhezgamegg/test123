'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNewTourPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    location: '',
    price: '',
    duration: '',
    image: '', // Lưu đường dẫn ảnh sau khi upload
    discount_percentage: '',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD") // chuyển tiếng Việt có dấu sang không dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa các dấu thanh
    .replace(/[^a-z0-9 -]/g, "") // loại bỏ ký tự đặc biệt
    .replace(/\s+/g, "-") // thay khoảng trắng bằng -
    .replace(/-+/g, "-") // loại bỏ nhiều dấu - liên tiếp
    .replace(/^-+|-+$/g, ""); // loại bỏ - ở đầu hoặc cuối
};


 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'title') {
    const newSlug = generateSlug(value);
    setFormData({ ...formData, title: value, slug: newSlug });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};
 const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setPreviewImage(URL.createObjectURL(file));
  setUploading(true);
  setUploadError(null);

  const imageData = new FormData();
  imageData.append('image', file);

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: imageData,
    });

    if (!response.ok) {
      const errorText = await response.text(); // <- In ra nếu lỗi
      console.error('Upload failed. Server said:', errorText || 'Không có phản hồi');
      setUploadError('Không thể tải ảnh lên.');
      setUploading(false);
      return;
    }

    const result = await response.json();
    setFormData(prev => ({ ...prev, image: `/images/${result.filename}` }));
    setUploading(false);
  } catch (err) {
    console.error('Lỗi mạng khi tải ảnh:', err);
    setUploadError('Lỗi mạng, không thể tải ảnh lên.');
    setUploading(false);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/tour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/tour'); // Chuyển về trang quản lý tour sau khi thêm thành công
      } else {
        const errorData = await response.json();
        console.error('Lỗi khi thêm tour:', errorData);
        alert('Đã có lỗi xảy ra khi thêm tour.');
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
      alert('Lỗi mạng, không thể thêm tour.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Thêm mới Tour</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
            Tiêu đề
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            readOnly
            value={formData.slug}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full bg-gray-300 cursor-no-drop py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
            Địa điểm
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
            Giá
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">
            Thời lượng
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
            Hình ảnh
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {uploading && <p className="text-yellow-500 text-sm mt-1">Đang tải lên...</p>}
          {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
          {previewImage && !uploadError && (
            <div className="mt-2">
              <img src={previewImage} alt="Xem trước ảnh" className="max-w-full h-auto rounded" />
            </div>
          )}
          {formData.image && !previewImage && !uploadError && (
            <div className="mt-2">
              <img src={formData.image} alt="Ảnh đã tải lên" className="max-w-full h-auto rounded" />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="discount_percentage" className="block text-gray-700 text-sm font-bold mb-2">
            Giảm giá (%)
          </label>
          <input
            type="number"
            id="discount_percentage"
            name="discount_percentage"
            value={formData.discount_percentage}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
            onClick={() => router.back()}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            disabled={uploading}
          >
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
}