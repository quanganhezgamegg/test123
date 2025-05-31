'use client';
import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
const [showErrorModal, setShowErrorModal] = useState(false); // modal lỗi
const [errorMessage, setErrorMessage] = useState(''); // nội dung lỗi

  const handleSubmit = async (e) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
     setErrorMessage('Email không hợp lệ. Vui lòng nhập đúng định dạng (ví dụ: abc@example.com).');
    setShowErrorModal(true);
    return;
  }
  else {
      const res = await fetch('/api/subcribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
      setShowModal(true);
      setEmail('');

  }
};


  return (
    <div className="p-6 min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-xl px-6 py-8 flex flex-col gap-5"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-800">Đăng ký nhận tin</h1>

        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
          title="Vui lòng nhập đúng định dạng email (ví dụ: abc@example.com)"
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        >
          Đăng ký để nhận ưu đãi mới nhất
        </button>
      </form>

      {showModal && (
        <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-2 text-green-600">🎉 Đăng ký thành công!</h2>
            <p className="text-gray-700 mb-4">Cảm ơn bạn đã đăng ký nhận bản tin của chúng tôi.</p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-md transition duration-200"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4 text-red-600">❌ Lỗi</h2>
            <p>{errorMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
