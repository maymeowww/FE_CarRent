import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { backendApi } from '../../api/backend';

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const loadCars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await backendApi.getCars();
      // รองรับทั้งรูปแบบ { items: [...] } จาก Go Backend และ Array ตรงๆ
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.items)
        ? data.items
        : [];
      setCars(list);
    } catch (err) {
      setError(err.message || 'ไม่สามารถโหลดข้อมูลรถได้');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  const handleDelete = async (id, label) => {
    if (!window.confirm(`ยืนยันการลบรถ "${label}" ออกจากระบบหรือไม่?`)) return;
    setDeletingId(id);
    try {
      await backendApi.deleteCar(id);
      await loadCars();
    } catch (err) {
      alert(err.message || 'ไม่สามารถลบข้อมูลรถได้');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredCars = cars.filter((car) => {
    const keyword = searchTerm.trim().toLowerCase();
    if (!keyword) return true;
    return (
      (car.brand || '').toLowerCase().includes(keyword) ||
      (car.model || '').toLowerCase().includes(keyword) ||
      (car.name || '').toLowerCase().includes(keyword) ||
      (car.license_plate || '').toLowerCase().includes(keyword)
    );
  });

  const formatType = (type) => {
    const t = (type || '').toLowerCase();
    if (t === 'car') return 'รถยนต์';
    if (t === 'motorcycle') return 'มอเตอร์ไซค์';
    if (t === 'sedan') return 'รถเก๋ง';
    if (t === 'suv') return 'SUV / รถตู้';
    return type || '-';
  };

  return (
    <div className="space-y-6 text-slate-900">
      {/* ส่วนหัวหน้า + ปุ่มเพิ่มรถ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            จัดการข้อมูลรถ
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            เพิ่ม แก้ไข หรือลบรายการรถยนต์และมอเตอร์ไซค์ที่เปิดให้เช่าในระบบ
          </p>
        </div>

        <Link
          to="/admin/cars/new"
          className="inline-flex items-center justify-center gap-2 bg-[#1d64f2] hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-xs self-start sm:self-auto"
        >
          <span>+ เพิ่มรถคันใหม่</span>
        </Link>
      </div>

      {/* ช่องค้นหา */}
      {!loading && !error && cars.length > 0 && (
        <div className="relative">
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
            />
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="ค้นหายี่ห้อ รุ่นรถ หรือทะเบียน..."
            className="w-full bg-slate-50/70 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:bg-white focus:outline-none focus:border-[#1d64f2] transition"
          />
        </div>
      )}

      {/* สถานะกำลังโหลด */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* สถานะ Error */}
      {!loading && error && (
        <div className="bg-red-50/80 border border-red-200 rounded-2xl py-10 px-6 text-center">
          <h3 className="text-base font-bold text-red-700 mb-1">เกิดข้อผิดพลาด</h3>
          <p className="text-sm text-red-600 mb-5">{error}</p>
          <button
            type="button"
            onClick={loadCars}
            className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      )}

      {/* สถานะไม่มีข้อมูลรถ */}
      {!loading && !error && cars.length === 0 && (
        <div className="bg-slate-50/70 border border-dashed border-slate-300 rounded-2xl py-14 px-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1d64f2] flex items-center justify-center text-xl mx-auto mb-3">
            🚘
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            ยังไม่มีข้อมูลรถในระบบ
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            เริ่มต้นเพิ่มรถคันแรกของคุณเพื่อให้ลูกค้าสามารถกดจองได้
          </p>
          <Link
            to="/admin/cars/new"
            className="inline-flex items-center bg-[#1d64f2] hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
          >
            + เพิ่มรถคันใหม่
          </Link>
        </div>
      )}

      {/* ตารางรายการรถ */}
      {!loading && !error && cars.length > 0 && (
        <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase">
                  <th className="py-3.5 px-4">รถ</th>
                  <th className="py-3.5 px-4">ประเภท</th>
                  <th className="py-3.5 px-4">ราคา / วัน</th>
                  <th className="py-3.5 px-4">สถานะ</th>
                  <th className="py-3.5 px-4 text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredCars.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-slate-400 text-xs">
                      ไม่พบรถที่ตรงกับคำค้นหา
                    </td>
                  </tr>
                ) : (
                  filteredCars.map((car) => {
                    const title = `${car.brand || ''} ${car.model || car.name || ''}`.trim() || `รถ #${car.id}`;
                    const price = car.price_per_day ?? car.daily_rate ?? car.price ?? 0;
                    const imageUrl = car.image_url || car.image;
                    const isAvailable = (car.status || 'available').toLowerCase() === 'available';

                    return (
                      <tr key={car.id} className="hover:bg-slate-50/60 transition">
                        {/* รูป + ชื่อรถ */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-10 rounded-xl bg-slate-100 border border-slate-200/70 overflow-hidden flex items-center justify-center shrink-0">
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={title}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-base">🚘</span>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 leading-snug">
                                {title}
                              </p>
                              <p className="text-xs text-slate-400">
                                ID: #{car.id}
                                {car.license_plate ? ` • ทะเบียน ${car.license_plate}` : ''}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ประเภท */}
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {formatType(car.type || car.category)}
                        </td>

                        {/* ราคา */}
                        <td className="py-3.5 px-4 font-bold text-[#1d64f2]">
                          ฿{Number(price).toLocaleString()}
                        </td>

                        {/* สถานะ */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                              isAvailable
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isAvailable ? 'bg-emerald-500' : 'bg-amber-500'
                              }`}
                            />
                            {isAvailable ? 'ว่างพร้อมเช่า' : car.status}
                          </span>
                        </td>

                        {/* ปุ่มแก้ไข / ลบ */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              to={`/admin/cars/${car.id}/edit`}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-blue-200 text-[#1d64f2] hover:bg-blue-50 transition"
                            >
                              แก้ไข
                            </Link>
                            <button
                              type="button"
                              disabled={deletingId === car.id}
                              onClick={() => handleDelete(car.id, title)}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white disabled:opacity-50 transition"
                            >
                              {deletingId === car.id ? 'กำลังลบ...' : 'ลบ'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}