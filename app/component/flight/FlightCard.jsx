import { useRouter } from "next/navigation";

export default function FlightCard({ flight }) {
  const router = useRouter();

  const handleBook = () => {
    const query = new URLSearchParams({
      from: flight.from,
      to: flight.to,
      date: flight.date || "",
    }).toString();

    router.push(`/booking?${query}`);
  };

  return (
    <div className="border rounded-xl shadow p-4">
      <h2 className="text-lg font-bold mb-2">{flight.airline}</h2>
      <p>{flight.from} → {flight.to}</p>
      <p className="text-sm text-gray-600">{flight.time}</p>
      {flight.date && <p className="text-sm text-gray-600">Ngày: {flight.date}</p>}
      {flight.price && <p className="text-green-600 font-semibold">{flight.price} đ</p>}
      <button
        onClick={handleBook}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Đặt ngay
      </button>
    </div>
  );
}
