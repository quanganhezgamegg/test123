// components/home/CustomerTestimonials.jsx
import  Image  from "next/image";
const testimonials = [
    {
      name: "Nguyễn Thị Hương",
      comment: "Dịch vụ rất chuyên nghiệp, tour đi đúng lịch trình, hài lòng tuyệt đối!",
      avatar: "/image/user/avt2.jpg",
    },
    {
      name: "Trần Văn Nam",
      comment: "Mình đặt tour Phú Quốc, gia đình cực kỳ thích, giá lại hợp lý!",
      avatar: "/image/user/avt1.jpg",
    },
    {
      name: "Lê Thảo My",
      comment: "Trang web dễ dùng, chăm sóc khách hàng rất nhanh nhẹn và nhiệt tình.",
      avatar: "/image/user/avt2.jpg",
    },
  ];
  

  
  export default function CustomerTestimonials() {
    return (
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Khách hàng nói gì?</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center"
              >
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={80}
                  height={80}
                  className="mx-auto rounded-full mb-4"
                />
                <p className="text-sm text-gray-600 italic">"{t.comment}"</p>
                <h4 className="mt-4 font-semibold">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  