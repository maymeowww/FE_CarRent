// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">ยินดีต้อนรับสู่ระบบจัดการร้านเช่ารถ</h1>
      <p className="text-gray-600">เลือกเมนูทางซ้ายเพื่อจัดการข้อมูลรถหรืออนุมัติรายการจองของลูกค้า</p>
      <div className="flex gap-4 pt-4">
        <Link to="/admin/cars/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ เพิ่มรถคันใหม่</Link>
        <Link to="/admin/bookings" className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700">ตรวจสอบรายการจอง</Link>
      </div>
    </div>
  );
}