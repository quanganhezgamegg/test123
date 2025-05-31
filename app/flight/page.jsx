
import FlightList from "../component/flight/FlightList";
import FeatureHighlights from "../component/flight/FeatureHighlights";
import NewsletterSignup from "../component/flight/NewsletterSignup";

export const metadata = {
  title: "Đặt vé máy bay | Travel Booking",
  description: "Tìm và đặt vé máy bay giá tốt, tiện lợi",
};

export default function FlightPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10 space-y-12 bg-white">
      <h1 className="text-3xl font-bold text-center">Đặt vé máy bay giá rẻ</h1>
      <FlightList />
      <FeatureHighlights />
      <NewsletterSignup />
    </main>
  );
}
