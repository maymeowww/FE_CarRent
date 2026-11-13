import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user;

  // เช็กสิทธิ์ Admin (รองรับทั้ง role และ Role รวมถึงตัวพิมพ์เล็ก/ใหญ่)
  const isAdmin =
    (user?.role || user?.Role || '').toLowerCase() === 'admin' ||
    user?.is_admin === true;

  const handleLogout = () => {
    if (auth?.logout) {
      auth.logout();
    }
    navigate('/');
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm transition ${
      isActive
        ? 'font-bold text-[#1d64f2]'
        : 'font-medium text-slate-600 hover:text-[#1d64f2]'
    }`;

  return (
    <header className="bg-white border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* ฝั่งซ้าย : โลโก้ + เมนูนำทางเรียงต่อกัน */}
        <div className="flex items-center gap-7">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="text-2xl leading-none" role="img" aria-label="car">
              🚘
            </span>
            <span className="font-extrabold text-xl tracking-tight text-[#1d64f2]">
              CarRent
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6">
            <NavLink to="/" end className={navLinkClass}>
              หน้าแรก
            </NavLink>
            <NavLink to="/cars" className={navLinkClass}>
              รถของเรา
            </NavLink>
            {user && (
              <NavLink to="/my-bookings" className={navLinkClass}>
                การจองของฉัน
              </NavLink>
            )}
            <NavLink to="/api-lab" className={navLinkClass}>
              API Lab
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              เกี่ยวกับ
            </NavLink>
          </nav>
        </div>

        {/* ฝั่งขวา : เมนูเมื่อล็อกอินแล้ว หรือ ปุ่มเข้าสู่ระบบ/สมัครสมาชิก */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* ปุ่ม Admin จะแสดงเฉพาะบัญชีที่มี role === 'admin' */}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                      isActive
                        ? 'bg-amber-500 text-white border-amber-500'
                        : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                    }`
                  }
                >
                  จัดการระบบ (Admin)
                </NavLink>
              )}

              <Link
                to="/profile"
                className="text-xs font-semibold text-slate-700 hover:text-[#1d64f2] transition"
              >
                {user.name || user.email}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="border border-blue-200 text-[#1d64f2] hover:bg-blue-50 text-xs font-semibold px-4 py-2 rounded-lg transition"
              >
                ออกจากระบบ
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-blue-200 text-[#1d64f2] hover:bg-blue-50 text-sm font-medium px-4 py-1.5 rounded-lg transition"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                to="/register"
                className="bg-[#1d64f2] hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition shadow-xs"
              >
                สมัครสมาชิก
              </Link>
            </>
          )}
        </div>
      </div>

      {/* เมนูสำหรับหน้าจอมือถือ */}
      <nav className="sm:hidden flex items-center justify-around border-t border-gray-100 py-2 px-4 bg-white">
        <NavLink to="/" end className={navLinkClass}>
          หน้าแรก
        </NavLink>
        <NavLink to="/cars" className={navLinkClass}>
          รถของเรา
        </NavLink>
        {user && (
          <NavLink to="/my-bookings" className={navLinkClass}>
            การจองของฉัน
          </NavLink>
        )}
        {isAdmin && (
          <NavLink to="/admin" className={navLinkClass}>
            Admin
          </NavLink>
        )}
        <NavLink to="/api-lab" className={navLinkClass}>
          API Lab
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          เกี่ยวกับ
        </NavLink>
      </nav>
    </header>
  );
}