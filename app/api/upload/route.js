import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('image');

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public', 'image');
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Tạo thư mục nếu chưa tồn tại
    await mkdir(uploadDir, { recursive: true });

    // Ghi file
    await writeFile(filePath, buffer);

    return NextResponse.json({ message: 'Upload thành công', filename: fileName });
  } catch (error) {
    console.error('💥 Lỗi server khi upload:', error);
    return NextResponse.json({ message: 'Lỗi server khi upload' }, { status: 500 });
  }
}
