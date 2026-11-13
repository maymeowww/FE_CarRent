import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { backendApi } from '../../api/backend';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      backendApi.getCars().catch(() => ({ items: [] })),
      backendApi.getAllBookings().catch(() => ({ items: [] })),
    ])
      .then(([carsRes, bookingsRes]) => {
        const cars = Array.isArray(carsRes)
          ? carsRes
          : Array.isArray(carsRes?.items)
          ? carsRes.items
          : [];
        const bookings = Array.isArray(bookingsRes)
          ? bookingsRes
          : Array.isArray(bookingsRes?.items)
          ? bookingsRes.items
          : Array.isArray(bookingsRes?.bookings)
          ? bookingsRes.bookings
          : [];

        const available = cars.filter(
          (c) => (c.status || 'available').toLowerCase() === 'available'
        ).length;
        const pending = bookings.filter(
          (b) => (b.status || '').toLowerCase() === 'pending'
        ).length;

        setStats({
          totalCars: cars.length,
          availableCars: available,
          totalBookings: bookings.length,
          pendingBookings: pending,
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: 'รถทั้งหมดในระบบ',
      value: `${stats.totalCars} คัน`,
      sub: `ว่างพร้อมเช่า ${stats.availableCars} คัน`,
      icon: '🚘',
    },
    {
      label: 'รายการจองทั้งหมด',
      value: `${stats.totalBookings} รายการ`,
      sub: 'ประวัติการเช่าสะสม',
      icon: '📋',
    },
    {
      label: 'รอดำเนินการอนุมัติ',
      value: `${stats.pendingBookings} รายการ`,
      sub: 'รายการใหม่ที่รอตรวจสอบ',
      icon: '⏳',
    },
  ];

  return (
    <div className="space-y-8">
      {/* ส่วนหัว */}
      <div>
        <span className="inline-block text-xs font-semibold text-[#1d64f2] bg-blue-50 px-3 py-1 rounded-full mb-2">
          Admin Workspace
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          ยินดีต้อนรับสู่ระบบจัดการร้านเช่ารถ
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          เลือกเมนูทางซ้ายเพื่อจัดการข้อมูลรถ หรือตรวจสอบและอนุมัติรายการจองของลูกค้า
        </p>
      </div>

      {/* การ์ดสรุปข้อมูล (โทนเดียวกับการ์ดประเภทหน้าแรก) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1d64f2] flex items-center justify-center text-lg mb-4">
              {card.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500">{card.label}</p>
              <p className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {loading ? '...' : card.value}
              </p>
              <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ปุ่มทางลัด */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-3">
        <Link
          to="/admin/cars/new"
          className="inline-flex items-center gap-2 bg-[#1d64f2] hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-xs"
        >
          <span>+ เพิ่มรถคันใหม่</span>
        </Link>

        <Link
          to="/admin/bookings"
          className="inline-flex items-center gap-2 bg-white border border-blue-200 text-[#1d64f2] hover:bg-blue-50 text-sm font-semibold px-5 py-2.5 rounded-xl transition"
        >
          <span>ตรวจสอบรายการจอง</span>
        </Link>
      </div>
    </div>
  );
}