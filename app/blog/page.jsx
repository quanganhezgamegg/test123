import connectDB from '@/app/lib/db'
import Link from 'next/link'

export default async function BlogPage() {
  const pool = await connectDB()
  const [blogs] = await pool.query('SELECT id, title, slug, content, image_url, created_at FROM blogposts ORDER BY created_at DESC')

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Tất cả bài viết</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden">
            <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">{blog.content.slice(0, 100)}...</p>
              <Link href={`/blog/${blog.slug}`} className="text-blue-600 hover:underline text-sm mt-3 inline-block">
                Xem chi tiết →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
