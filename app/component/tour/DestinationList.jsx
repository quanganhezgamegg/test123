// components/destination/DestinationList.jsx
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    slug : "hanoi",
    name: "Hà Nội",
    description: "Thủ đô nghìn năm văn hiến với nhiều danh lam thắng cảnh.",
    image: "/image/tours/hanoi.jpg",
    price: "Từ 2.500.000đ",
  },
  { slug : "dalat",
    name: "Đà Lạt",
    description: "Thành phố ngàn hoa, khí hậu ôn hòa quanh năm.",
    image: "/image/tours/Dalat.jpg",
    price: "Từ 3.000.000đ",
  },
  { slug : "phuquoc",
    name: "Phú Quốc",
    description: "Thiên đường biển đảo hấp dẫn du khách mọi miền.",
    image: "/image/tours/Phuquoc.jpg",
    price: "Từ 4.200.000đ",
  },
];

export default function DestinationList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {destinations.map((d, idx) => (
        <DestinationCard key={idx} destination={d} />
      ))}
    </div>
  );
}
