// components/home/FeatureHighlights.jsx
const features = [
    {
      title: "Giá tốt nhất",
      description: "Chúng tôi cam kết mang lại mức giá cạnh tranh nhất trên thị trường.",
      icon: "💰",
    },
    {
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ CSKH luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào.",
      icon: "📞",
    },
    {
      title: "Đặt tour dễ dàng",
      description: "Giao diện thân thiện, thao tác đặt vé nhanh chóng và đơn giản.",
      icon: "🧭",
    },
  ];
  
  export default function FeatureHighlights() {
    return (
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Vì sao chọn chúng tôi</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, idx) => (
              <div
                key={idx}
                className="bg-blue-50 hover:bg-blue-100 p-6 rounded-xl text-center shadow-md hover:shadow-xl transition duration-300"
              >
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  