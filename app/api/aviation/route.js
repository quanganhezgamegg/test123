// app/api/aviation/route.js
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get("http://api.aviationstack.com/v1/flights", {
      params: {
        access_key: process.env.AVIATIONSTACK_API_KEY,
        limit: 10,
      },
    });

    return Response.json(response.data);
  } catch (error) {
    console.error("Lỗi khi gọi API:", error.response?.data || error.message);
    return new Response(JSON.stringify({ error: "Lỗi khi lấy dữ liệu chuyến bay" }), { status: 500 });
  }
}
