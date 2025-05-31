"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function PassengerInfoPage() {
  const searchParams = useSearchParams();

  const adults = parseInt(searchParams.get("adults") || "0");
  const children = parseInt(searchParams.get("children") || "0");
  const infants = parseInt(searchParams.get("infants") || "0");

  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    const initialPassengers = [];

    for (let i = 0; i < adults; i++) {
      initialPassengers.push({
        type: "Người lớn",
        name: "",
        gender: "",
        dob: "",
        cccd: "",
        cccdExpired: "",
      });
    }

    for (let i = 0; i < children; i++) {
      initialPassengers.push({
        type: "Trẻ em",
        name: "",
        gender: "",
        dob: "",
      });
    }

    // Không thêm Em bé vào form

    setPassengers(initialPassengers);
  }, [adults, children, infants]);

  const handleChange = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  const handleSubmit = () => {
    console.log("Passenger data:", passengers);
    alert("Gửi thông tin thành công!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Thông tin hành khách</h1>

      {passengers.map((p, idx) => {
        const labelIndex =
          p.type === "Người lớn"
            ? passengers.slice(0, idx + 1).filter((x) => x.type === "Người lớn").length
            : passengers.slice(0, idx + 1).filter((x) => x.type === "Trẻ em").length;

        return (
          <div key={idx} className="border p-4 rounded mb-4">
            <h2 className="font-semibold mb-2">
              {p.type} {labelIndex}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Họ và tên"
                className="border p-2 rounded"
                value={p.name}
                onChange={(e) => handleChange(idx, "name", e.target.value)}
              />
              <input
                placeholder="Giới tính"
                className="border p-2 rounded"
                value={p.gender}
                onChange={(e) => handleChange(idx, "gender", e.target.value)}
              />
              <input
                placeholder="Ngày sinh"
                className="border p-2 rounded"
                value={p.dob}
                onChange={(e) => handleChange(idx, "dob", e.target.value)}
              />
              {p.type === "Người lớn" && (
                <>
                  <input
                    placeholder="CCCD"
                    className="border p-2 rounded"
                    value={p.cccd}
                    onChange={(e) => handleChange(idx, "cccd", e.target.value)}
                  />
                  <input
                    placeholder="Ngày hết hạn CCCD"
                    className="border p-2 rounded"
                    value={p.cccdExpired}
                    onChange={(e) => handleChange(idx, "cccdExpired", e.target.value)}
                  />
                </>
              )}
            </div>
          </div>
        );
      })}

      <button
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Tiếp tục
      </button>
    </div>
  );
}
