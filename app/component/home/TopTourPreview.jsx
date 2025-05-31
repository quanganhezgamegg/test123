import Image from "next/image";

const tours = [
  {
    id: 1,
    title: "Khám phá Đà Lạt",
    image: "/image/tours/tour1.jpg",
    description: "Trải nghiệm thành phố ngàn hoa mộng mơ trong 3 ngày 2 đêm.",
    price: "3.200.000đ",
  },
  {
    id: 2,
    title: "Du lịch Phú Quốc",
    image: "/image/tours/tour2.jpg",
    description: "Thiên đường nghỉ dưỡng biển đảo cùng gia đình và bạn bè.",
    price: "4.500.000đ",
  },
  {
    id: 3,
    title: "Hành trình miền Trung",
    image: "/image/tours/tour3.jpg",
    description: "Huế - Đà Nẵng - Hội An với văn hóa và ẩm thực đặc sắc.",
    price: "5.100.000đ",
  },
];

export default function TourListPreview() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Tour nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:shadow-xl hover:scale-[1.02] group"
            >
              <div className="overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={400}
                  height={250}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-600 my-2">{tour.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-primary font-bold">{tour.price}</span>
                  <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-colors duration-300">
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
