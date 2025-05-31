// components/destination/DestinationDetail.jsx
import Image from "next/image";

export default function DestinationDetail({ destination }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Image
        src={destination.image}
        alt={destination.name}
        width={1000}
        height={500}
        className="w-full h-[400px] object-cover rounded-lg shadow-md mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>
      <p className="text-gray-700 mb-6">{destination.description}</p>
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Giá tour</h2>
        <p className="text-blue-600 text-lg font-bold">{destination.price}</p>
      </div>
      {/* Bạn có thể thêm lịch trình tour, hình ảnh, bản đồ,... ở đây */}
    </div>
  );
}
