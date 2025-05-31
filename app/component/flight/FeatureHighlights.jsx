export default function FeatureHighlights() {
    const features = [
      "✅ Giá vé cạnh tranh",
      "✅ Nhiều hãng bay uy tín",
      "✅ Hỗ trợ khách hàng 24/7",
    ];
  
    return (
      <div className="bg-blue-50 p-6 rounded text-center">
        <h2 className="text-xl font-bold mb-4">Vì sao chọn chúng tôi?</h2>
        <ul className="space-y-2">
          {features.map((f, i) => (
            <li key={i} className="hover:text-blue-600 transition">{f}</li>
          ))}
        </ul>
      </div>
    );
  }
  