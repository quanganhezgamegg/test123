import DestinationDetail from "@/app/component/tour/DestinationDetail";
// Data mẫu
const destinations = [
  {
    slug: "hanoi",
    name: "Hà Nội",
    description: "Thủ đô nghìn năm văn hiến với nhiều danh lam thắng cảnh nổi tiếng như Hồ Gươm, Văn Miếu, Lăng Bác.",
    image: "/image/tour/hanoi.jpg",
    price: "Từ 2.500.000đ",
  },
  {
    slug: "phuquoc",
    name: "Phú Quốc",
    description: "Đảo ngọc Việt Nam với những bãi biển trong xanh và khu nghỉ dưỡng cao cấp.",
    image: "/image/tour/Phuquoc.jpg",
    price: "Từ 4.200.000đ",
  },
  {
    slug: "dalat",
    name: "Đà Lạt",
    description: "Thành phố ngàn hoa, khí hậu mát mẻ quanh năm, nổi tiếng với các vườn hoa, đồi chè, thác nước.",
    image: "/image/tour/Dalat.jpg",
    price: "Từ 3.000.000đ",
  },
];

// Server Component
export default function DestinationPage({ params }) {
  const { slug } = params;

  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Không tìm thấy điểm đến!</h2>
      </div>
    );
  }

  return <DestinationDetail destination={destination} />;
}
