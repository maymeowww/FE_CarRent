import React, { useState } from 'react';
import { backendApi } from '../api/backend';

const CACHE_KEY = 'carrent_daily_cars_cache';

export default function ApiLab() {
  const baseUrl =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) ||
    process.env.REACT_APP_API_URL ||
    'http://localhost:8080';

  const [searchQuery, setSearchQuery] = useState('Toyota');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [requestUrl, setRequestUrl] = useState(
    `${baseUrl}/api/cars?search=Toyota`
  );
  const [responseData, setResponseData] = useState('ยังไม่ได้ส่ง request');
  const [cacheNotice, setCacheNotice] = useState('');

  // แปลงข้อมูลให้อยู่ในรูปแบบมาตรฐานของ Car Object (toCar)
  const toCar = (item) => ({
    id: item.id ?? item.ID ?? null,
    name:
      item.name ||
      [item.brand, item.model].filter(Boolean).join(' ') ||
      'ไม่ระบุรุ่นรถ',
    brand: item.brand || '',
    model: item.model || '',
    type: item.type || item.category || 'Sedan',
    pricePerDay: Number(item.price_per_day ?? item.pricePerDay ?? item.price ?? 0),
    imageUrl: item.image_url || item.imageUrl || item.image || '',
    available: item.available ?? true,
  });

  // ฟังก์ชันยิง API ค้นหารถ
  const sendRequest = async (path, transformToCar = false) => {
    const fullUrl = `${baseUrl}${path}`;
    setRequestUrl(fullUrl);
    setStatus('loading');
    setCacheNotice('');
    setResponseData('กำลังส่ง request...');

    const startTime = performance.now();
    try {
      const res = await fetch(fullUrl);
      const elapsed = Math.round(performance.now() - startTime);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const rawData = await res.json();
      let output = rawData;

      if (transformToCar) {
        output = Array.isArray(rawData)
          ? rawData.map(toCar)
          : toCar(rawData);
      }

      setStatus('success');
      setCacheNotice(`ตอบกลับสำเร็จใน ${elapsed} ms`);
      setResponseData(JSON.stringify(output, null, 2));
    } catch (err) {
      setStatus('error');
      setResponseData(`Error: ${err.message || 'Failed to fetch'}`);
    }
  };

  // ทดสอบ getCars() ผ่าน Cache รายวันใน localStorage
  const handleGetCarsWithDailyCache = async () => {
    const fullUrl = `${baseUrl}/api/cars`;
    setRequestUrl(fullUrl);
    setStatus('loading');

    const today = new Date().toISOString().slice(0, 10);
    const startTime = performance.now();

    try {
      const cachedRaw = localStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const parsed = JSON.parse(cachedRaw);
        if (parsed.date === today && Array.isArray(parsed.data)) {
          const elapsed = Math.round(performance.now() - startTime);
          setStatus('success');
          setCacheNotice(`อ่านจาก localStorage cache (${elapsed} ms)`);
          setResponseData(JSON.stringify(parsed.data, null, 2));
          return;
        }
      }

      const data = await backendApi.getCars();
      const elapsed = Math.round(performance.now() - startTime);
      localStorage.setItem(CACHE_KEY, JSON.stringify({ date: today, data }));

      setStatus('success');
      setCacheNotice(`ยิง API จริงและบันทึกลง cache แล้ว (${elapsed} ms)`);
      setResponseData(JSON.stringify(data, null, 2));
    } catch (err) {
      setStatus('error');
      setResponseData(`Error: ${err.message || 'Failed to fetch'}`);
    }
  };

  // ล้าง cache ใน localStorage
  const handleClearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    setCacheNotice('ล้าง cache เรียบร้อยแล้ว');
  };

  const statusTextColor = {
    idle: 'text-slate-400',
    loading: 'text-amber-600',
    success: 'text-emerald-600',
    error: 'text-red-600',
  };

  return (
    <div className="bg-white flex-1 py-12 px-6 text-slate-900">
      <div className="max-w-3xl mx-auto space-y-5">
        {/* หัวข้อและคำอธิบาย */}
        <div className="space-y-1.5">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            API Lab
          </h1>
          <p className="text-sm text-gray-500">
            กดปุ่มแล้วดูว่า Go Backend ตอบอะไรกลับมา ก่อนจะเอาไปใช้ในหน้าจริง
          </p>
        </div>

        {/* แถวช่องค้นหา + ปุ่ม ดู JSON ดิบ / ผ่าน toCar แล้ว */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setRequestUrl(
                `${baseUrl}/api/cars?search=${encodeURIComponent(e.target.value)}`
              );
            }}
            placeholder="ค้นหารถ เช่น Toyota..."
            className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#1d64f2] transition"
          />
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() =>
                sendRequest(
                  `/api/cars?search=${encodeURIComponent(searchQuery)}`,
                  false
                )
              }
              className="bg-[#1d64f2] hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition shadow-xs whitespace-nowrap"
            >
              ดู JSON ดิบ
            </button>
            <button
              type="button"
              onClick={() =>
                sendRequest(
                  `/api/cars?search=${encodeURIComponent(searchQuery)}`,
                  true
                )
              }
              className="bg-white hover:bg-blue-50 text-[#1d64f2] border border-blue-200 font-semibold text-sm px-5 py-2.5 rounded-xl transition whitespace-nowrap"
            >
              ผ่าน toCar แล้ว
            </button>
          </div>
        </div>

        {/* แถวปุ่มทดสอบ Cache รายวัน + ล้าง cache */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="button"
            onClick={handleGetCarsWithDailyCache}
            className="bg-white hover:bg-blue-50 text-[#1d64f2] border border-blue-200 font-semibold text-sm px-5 py-2.5 rounded-xl transition"
          >
            getCars() รถทั้งหมด ผ่าน cache รายวัน
          </button>
          <button
            type="button"
            onClick={handleClearCache}
            className="text-xs text-slate-600 underline hover:text-[#1d64f2] font-medium"
          >
            ล้าง cache
          </button>
          {cacheNotice && (
            <span className="text-xs text-emerald-600 font-medium">
              {cacheNotice}
            </span>
          )}
        </div>

        {/* คำอธิบายใต้ปุ่ม + แสดง GET URL */}
        <div className="space-y-1.5 pt-1">
          <p className="text-xs text-gray-500">
            กดครั้งแรกจะช้า (ยิงจริง) กดซ้ำจะเร็วมาก (อ่านจาก localStorage)
          </p>
          <p className="font-mono text-xs text-gray-400 break-all">
            GET {requestUrl}
          </p>
        </div>

        {/* กล่องแสดงผลลัพธ์ */}
        <div className="bg-white border border-blue-100 rounded-2xl overflow-hidden mt-2">
          {/* แถบหัวกล่องสีฟ้าอ่อน */}
          <div className="bg-[#f0f6ff] border-b border-blue-100 px-5 py-3 flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">สถานะ</span>
            <span className={`font-mono text-xs font-semibold ${statusTextColor[status]}`}>
              {status}
            </span>
          </div>

          {/* เนื้อหาผลลัพธ์ */}
          <div className="p-5">
            <pre className="font-mono text-xs text-slate-700 whitespace-pre-wrap break-words leading-relaxed max-h-96 overflow-y-auto">
              {responseData}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}