'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/api/blog')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch blogs');
        }
        return res.json();
      })
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setError("Không thể tải danh sách blog. Vui lòng thử lại.");
        setLoading(false);
      });
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa blog này không?')) {
      return;
    }
    try {
      const response = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setBlogs(blogs.filter(blog => blog.id !== id));
        alert('Blog đã được xóa thành công!');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Lỗi khi xóa blog.');
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert(`Đã xảy ra lỗi: ${err.message}`);
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b-2 pb-2">Quản lý Blog</h1>
      
      <div className="mb-6">
        <Link href="/admin/blog/create" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
          + Tạo mới Blog
        </Link>
      </div>

      {loading && (
        <p className="text-center text-lg text-blue-600">Đang tải danh sách blog...</p>
      )}

      {error && (
        <p className="text-center text-lg text-red-600">Lỗi: {error}</p>
      )}

      {!loading && !error && blogs.length === 0 && (
        <p className="text-center text-lg text-gray-600">Chưa có blog nào.</p>
      )}

      {!loading && !error && blogs.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tiêu đề
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ngày tạo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs.map(blog => (
                <tr key={blog.id} className="hover:bg-gray-50 transition duration-100 ease-in-out">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700">{new Date(blog.created_at).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex justify-between">
                    <Link href={`/admin/blog/${blog.id}`}>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                      Chi tiết
                    </button>
                  </Link>
                    <Link href={`/admin/blog/edit/${blog.id}`} className="text-white rounded bg-indigo-600 hover:bg-indigo-900 py-1 px-5  ">
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-white bg-red-500  px-5 rounded py-1 hover:bg-red-600"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}