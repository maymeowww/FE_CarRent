import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200/80 text-slate-600 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-100">
          {/* คอลัมน์ 1 : โลโก้และคำอธิบาย */}
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="text-xl leading-none" role="img" aria-label="car">
                🚘
              </span>
              <span className="font-extrabold text-lg tracking-tight text-[#1d64f2]">
                CarRent
              </span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
              ระบบจองรถเช่าออนไลน์ ทั้งรถยนต์และมอเตอร์ไซค์ เช็กสถานะรถว่างแบบเรียลไทม์ จองง่าย เดินทางมั่นใจทุกเส้นทาง
            </p>
          </div>

          {/* คอลัมน์ 2 : เมนูลัด */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              เมนูหลัก
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#1d64f2] transition">
                  หน้าแรก
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-[#1d64f2] transition">
                  รถของเรา
                </Link>
              </li>
              <li>
                <Link to="/api-lab" className="hover:text-[#1d64f2] transition">
                  API Lab
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#1d64f2] transition">
                  เกี่ยวกับ
                </Link>
              </li>
            </ul>
          </div>

          {/* คอลัมน์ 3 : ข้อมูลโปรเจกต์ */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              ข้อมูลรายวิชา
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              รายวิชา 520 341 Client Side Web Programming[cite: 6]
            </p>
            <p className="text-xs text-gray-400 mt-1">
              พัฒนาด้วย React, Tailwind CSS, Go และ PostgreSQL[cite: 6]
            </p>
          </div>
        </div>

        {/* แถบลิขสิทธิ์ด้านล่าง */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400">
          <p>&copy; {new Date().getFullYear()} CarRent. All rights reserved.</p>
          <p>670710977 &bull; 670710978[cite: 6]</p>
        </div>
      </div>
    </footer>
  );
}