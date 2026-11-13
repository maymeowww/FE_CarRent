import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { backendApi } from '../api/backend';
import CarGrid from '../components/CarGrid';

export default function Cars() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState(searchParams.get('location') || '');
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || 'ALL');

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await backendApi.getCars();
      setCars(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const filteredCars = cars.filter((car) => {
    const keyword = searchTerm.trim().toLowerCase();
    const matchKeyword =
      !keyword ||
      (car.brand && car.brand.toLowerCase().includes(keyword)) ||
      (car.model && car.model.toLowerCase().includes(keyword)) ||
      (car.name && car.name.toLowerCase().includes(keyword));

    const matchType =
      selectedType === 'ALL' ||
      (car.type && car.type.toLowerCase() === selectedType.toLowerCase()) ||
      (car.category && car.category.toLowerCase() === selectedType.toLowerCase());

    return matchKeyword && matchType;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('ALL');
    setSearchParams({});
  };

  return (
    <div className="bg-white flex-1 py-10 px-6 text-slate-900">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* หัวข้อหน้า */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          รายการรถเช่าทั้งหมด
        </h1>

        {/* กล่องค้นหาและตัวกรองประเภทรถ */}
        <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <svg
              className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
              placeholder="ค้นหายี่ห้อ หรือ รุ่นรถ..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1d64f2]"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:border-[#1d64f2] sm:w-48"
          >
            <option value="ALL">ทุกประเภทรถ</option>
            <option value="Sedan">รถเก๋ง (Sedan)</option>
            <option value="SUV">SUV และรถตู้</option>
            <option value="Scooter">มอเตอร์ไซค์ออโตเมติก</option>
            <option value="BigBike">บิ๊กไบค์</option>
          </select>
        </div>

        {/* สถานะ 1 : กำลังโหลดข้อมูล */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200/80 rounded-2xl overflow-hidden shadow-xs animate-pulse"
              >
                <div className="bg-slate-100 h-44 w-full"></div>
                <div className="p-5 space-y-3">
                  <div className="h-3.5 bg-slate-200/80 rounded-full w-1/2"></div>
                  <div className="h-3 bg-slate-100 rounded-full w-3/4"></div>
                  <div className="pt-2">
                    <div className="h-9 bg-slate-100 rounded-xl w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* สถานะ 2 : เกิดข้อผิดพลาด */}
        {!loading && error && (
          <div className="bg-red-50/80 border border-red-200 rounded-2xl py-12 px-6 text-center">
            <h3 className="text-lg font-bold text-red-700 mb-1.5">เกิดข้อผิดพลาด</h3>
            <p className="text-sm text-red-600 mb-6">{error}</p>
            <button
              type="button"
              onClick={fetchCars}
              className="bg-red-700 hover:bg-red-800 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-sm"
            >
              ลองใหม่อีกครั้ง
            </button>
          </div>
        )}

        {/* สถานะ 3 : ไม่พบข้อมูล */}
        {!loading && !error && filteredCars.length === 0 && (
          <div className="bg-slate-50/70 border border-dashed border-slate-300 rounded-2xl py-14 px-6 text-center">
            <div className="flex justify-center mb-3 text-slate-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.5 10.5a7.5 7.5 0 0013.15 6.15z"
                />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              ไม่พบรถที่ตรงกับการค้นหา
            </h3>
            <p className="text-xs text-gray-500 mb-5">
              ลองเปลี่ยนคำค้นหา หรือเลือกประเภทรถอื่น
            </p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="bg-white border border-blue-200 text-[#1d64f2] hover:bg-blue-50 font-semibold text-xs px-5 py-2 rounded-xl transition"
            >
              ล้างตัวกรอง
            </button>
          </div>
        )}

        {/* สถานะปกติ : มีรายการรถ */}
        {!loading && !error && filteredCars.length > 0 && (
          <CarGrid cars={filteredCars} />
        )}
      </div>
    </div>
  );
}