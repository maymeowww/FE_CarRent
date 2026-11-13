// src/pages/admin/AdminLayout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <aside className="bg-white p-4 rounded-xl border h-fit space-y-2">
        <h2 className="font-bold text-lg px-3 py-2 border-b">เมนูผู้ดูแลระบบ</h2>
        <Link to="/admin" className="block px-3 py-2 rounded hover:bg-gray-100">ภาพรวม (Dashboard)</Link>
        <Link to="/admin/cars" className="block px-3 py-2 rounded hover:bg-gray-100">จัดการข้อมูลรถ</Link>
        <Link to="/admin/bookings" className="block px-3 py-2 rounded hover:bg-gray-100">จัดการรายการเช่า</Link>
      </aside>
      <main className="md:col-span-3 bg-white p-6 rounded-xl border">
        <Outlet />
      </main>
    </div>
  );
}