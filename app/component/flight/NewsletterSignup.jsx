export default function NewsletterSignup() {
    return (
      <div className="bg-white shadow p-6 rounded text-center">
        <h2 className="text-xl font-semibold mb-2">Đăng ký nhận ưu đãi</h2>
        <p className="text-sm text-gray-500 mb-4">Nhận thông tin vé rẻ và khuyến mãi mới nhất</p>
        <form className="flex flex-col sm:flex-row gap-2 justify-center">
          <input
            type="email"
            placeholder="Nhập email của bạn"
            className="border p-2 rounded w-full sm:w-64"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Đăng ký
          </button>
        </form>
      </div>
    );
  }
  