export default function BlogDetail({ params }) {
    const { slug } = params;
  
    // Tạm thời hiển thị nội dung đơn giản (thay bằng fetch từ API hoặc DB sau này)
    return (
      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">Chi tiết bài viết: {slug}</h1>
        <p className="text-gray-700 mb-2">Ngày đăng: 20/04/2024</p>
        <div className="prose max-w-none">
          <p>
            Đây là nội dung chi tiết của bài viết <strong>{slug}</strong>. Bạn có thể thêm mô tả, hình ảnh, và định dạng markdown nếu cần.
          </p>
        </div>
      </main>
    );
  }
  