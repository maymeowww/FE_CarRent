import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="text-center py-16 space-y-4">
      <h1 className="text-4xl font-bold text-gray-800">404 - ไม่พบหน้าที่คุณต้องการ</h1>
      <Link to="/" className="inline-block text-blue-600 hover:underline">กลับสู่หน้าหลัก</Link>
    </div>
  );
}