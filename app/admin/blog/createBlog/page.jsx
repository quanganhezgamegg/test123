'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNewBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    image_url: '',
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
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
        const errorText = await response.text();
        console.error('Upload failed:', errorText);
        setUploadError('Không thể tải ảnh lên.');
        setUploading(false);
        return;
      }

      const result = await response.json();
      setFormData(prev => ({ ...prev, image_url: `/images/${result.filename}` }));
      setUploading(false);
    } catch (err) {
      console.error('Lỗi mạng:', err);
      setUploadError('Lỗi mạng khi tải ảnh.');
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/admin/blog');
      } else {
        const errorData = await response.json();
        console.error('Lỗi khi thêm blog:', errorData);
        alert('Đã có lỗi xảy ra khi thêm blog.');
      }
    } catch (error) {
      console.error('Lỗi mạng:', error);
      alert('Lỗi mạng, không thể thêm blog.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Thêm mới Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Tiêu đề</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="shadow border rounded w-full py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="slug" className="block text-gray-700 text-sm font-bold mb-2">Slug</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={formData.slug}
            readOnly
            className="shadow border rounded w-full bg-gray-300 cursor-not-allowed py-2 px-3"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Nội dung</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={5}
            className="shadow border rounded w-full py-2 px-3"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Hình ảnh</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="shadow border rounded w-full py-2 px-3"
          />
          {uploading && <p className="text-yellow-500 text-sm mt-1">Đang tải ảnh lên...</p>}
          {uploadError && <p className="text-red-500 text-sm mt-1">{uploadError}</p>}
          {previewImage && (
            <div className="mt-2">
              <img src={previewImage} alt="Xem trước ảnh" className="max-w-full h-auto rounded" />
            </div>
          )}
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
