// components/FlightList.js
"use client";

import { useEffect, useState } from "react";
import FlightCard from "./FlightCard";

export default function FlightList() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/aviation")
      .then((res) => res.json())
      .then((data) => {
        const formattedFlights = (data.data || []).map((f) => {
          const departureTime = f.departure?.scheduled;
          const arrivalTime = f.arrival?.scheduled;
          const date = departureTime ? departureTime.slice(0, 10) : "N/A";
          const time = `${departureTime?.slice(11, 16) || "?"} - ${arrivalTime?.slice(11, 16) || "?"}`;
          return {
            from: f.departure?.airport || "N/A",
            to: f.arrival?.airport || "N/A",
            time,
            date,
            airline: f.airline?.name || "Không rõ",
            price: f.price || null, // Giả sử có trường price
          };
        });
        setFlights(formattedFlights);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy chuyến bay:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải chuyến bay...</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {flights.map((flight, idx) => (
        <FlightCard key={idx} flight={flight} />
      ))}
    </div>
  );
}
