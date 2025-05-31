"use client";

import { useState, useEffect } from "react";
import NcInputNumber from "./NcInputNumber";
import { useRouter, useSearchParams } from "next/navigation";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Tự động điều chỉnh khi số người lớn thay đổi
  useEffect(() => {
    if (adults + children > 9) {
      setChildren(9 - adults);
    }
    if (infants > adults) {
      setInfants(adults);
    }
  }, [adults]);

  const handleChildrenChange = (val) => {
    if (val + adults > 9) {
      setChildren(9 - adults);
    } else {
      setChildren(val);
    }
  };

  const handleInfantsChange = (val) => {
    if (val > adults) {
      setInfants(adults);
    } else {
      setInfants(val);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (adults + children > 9) {
      alert("Tổng số người lớn và trẻ em không được vượt quá 9.");
      return;
    }

    if (infants > adults) {
      alert("Số lượng em bé không được nhiều hơn số người lớn.");
      return;
    }

    // ✅ Điều hướng sang trang thông tin khách hàng, truyền query params
    const from = searchParams.get("from") || "";
    const to = searchParams.get("to") || "";
    const date = searchParams.get("date") || "";

    const query = new URLSearchParams({
      from,
      to,
      date,
      adults: adults.toString(),
      children: children.toString(),
      infants: infants.toString(),
      contactName: name,
      contactPhone: phone,
    }).toString();

    router.push(`/passenger-info?${query}`);
  };

  const flightInfo = {
    from: searchParams.get("from"),
    to: searchParams.get("to"),
    date: searchParams.get("date"),
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Thông tin đặt vé</h1>
      <p>
        Chuyến bay: {flightInfo.from} → {flightInfo.to} ({flightInfo.date})
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Họ tên người liên hệ</label>
          <input
            type="text"
            required
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Số điện thoại</label>
          <input
            type="tel"
            required
            className="w-full border p-2 rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <NcInputNumber
          label="Người lớn"
          defaultValue={adults}
          min={1}
          max={9}
          onChange={(val) => setAdults(val)}
        />
        <NcInputNumber
          label="Trẻ em"
          defaultValue={children}
          min={0}
          max={9 - adults}
          onChange={handleChildrenChange}
        />
        <NcInputNumber
          label="Em bé (<2 tuổi)"
          defaultValue={infants}
          min={0}
          max={adults}
          onChange={handleInfantsChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded mt-4 hover:bg-blue-700"
        >
          Xác nhận đặt vé
        </button>
      </form>
    </div>
  );
}
