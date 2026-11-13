import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  const menuItems = [
    {
      to: '/admin',
      end: true,
      label: 'ภาพรวม (Dashboard)',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      to: '/admin/cars',
      end: false,
      label: 'จัดการข้อมูลรถ',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h8m-8 4h8m-9 4h10M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
        </svg>
      ),
    },
    {
      to: '/admin/bookings',
      end: false,
      label: 'จัดการรายการเช่า',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-slate-50/50 flex-1 py-10 px-6 text-slate-900">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        {/* แถบเมนูด้านซ้าย (Sidebar) */}
        <aside className="w-full md:w-64 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs shrink-0">
          <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1d64f2] flex items-center justify-center text-base">
              🛡️
            </span>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">
                เมนูผู้ดูแลระบบ
              </h2>
              <p className="text-[11px] text-slate-400">CarRent Management</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition ${
                    isActive
                      ? 'bg-blue-50 text-[#1d64f2] font-bold'
                      : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* พื้นที่แสดงเนื้อหาหลักด้านขวา */}
        <main className="flex-1 w-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-2xs">
          <Outlet />
        </main>
      </div>
    </div>
  );
}