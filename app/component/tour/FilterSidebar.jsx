// components/destination/FilterSidebar.jsx
export default function FilterSidebar() {
    return (
      <aside className="w-full md:w-64 bg-white shadow-md p-4 rounded-lg">
        <h4 className="text-lg font-bold mb-4">Lọc kết quả</h4>
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Khoảng giá</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Tất cả</option>
              <option>Dưới 3 triệu</option>
              <option>3-5 triệu</option>
              <option>Trên 5 triệu</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Khu vực</label>
            <select className="w-full border rounded px-2 py-1">
              <option>Miền Bắc</option>
              <option>Miền Trung</option>
              <option>Miền Nam</option>
            </select>
          </div>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Áp dụng
          </button>
        </form>
      </aside>
    );
  }
  