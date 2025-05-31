// app/admin/blog/[id]/page.jsx

'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error('Lỗi khi lấy dữ liệu blog:', err);
      }
    }
    if (id) fetchBlog();
  }, [id]);

  if (!blog) return <div>Đang tải...</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">Slug: {blog.slug}</p>
      {blog.image_url && <img src={`C:/User/vugia/final/public/image/${blog.image_url}`} alt="Image" className="mb-4 w-full h-auto rounded" />}
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
}
