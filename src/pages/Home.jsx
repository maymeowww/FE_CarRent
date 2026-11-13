import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  // สถานะฟอร์มค้นหาด้านบน
  const [vehicleTab, setVehicleTab] = useState('car'); // 'car' | 'motorcycle'
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (pickupDate) params.set('pickup', pickupDate);
    if (returnDate) params.set('return', returnDate);
    if (vehicleTab === 'motorcycle') {
      params.set('type', 'Scooter');
    }

    const queryString = params.toString();
    navigate(queryString ? `/cars?${queryString}` : '/cars');
  };

  // ข้อมูลการ์ด "เลือกประเภทรถ" 4 ประเภท
  const categories = [
    {
      type: 'Sedan',
      title: 'รถเก๋ง',
      desc: 'นั่งสบาย ประหยัดน้ำมัน เหมาะกับคู่รักและครอบครัวเล็ก',
      price: '฿800',
      btnText: 'ดูรถเก๋ง',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-4M7.5 13h.01M16.5 13h.01" />
        </svg>
      ),
    },
    {
      type: 'SUV',
      title: 'SUV และรถตู้',
      desc: 'ที่นั่งและพื้นที่เก็บของเยอะ เหมาะกับกลุ่มเพื่อนและทริปยาว',
      price: '฿1,500',
      btnText: 'ดูSUV และรถตู้',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 13h18v4a1 1 0 01-1 1h-1a2 2 0 11-4 0H9a2 2 0 11-4 0H4a1 1 0 01-1-1v-4zm0 0l2-5a2 2 0 011.86-1.26h7.28a2 2 0 011.66.89L18 11h2a1 1 0 011 1v1" />
        </svg>
      ),
    },
    {
      type: 'Scooter',
      title: 'มอเตอร์ไซค์ออโตเมติก',
      desc: 'คล่องตัว ขี่ง่าย เหมาะกับเที่ยวในเมืองและเกาะ',
      price: '฿250',
      btnText: 'ดูมอเตอร์ไซค์ออโตเมติก',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="6.5" cy="16.5" r="2.5" strokeWidth="1.8" />
          <circle cx="17.5" cy="16.5" r="2.5" strokeWidth="1.8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 16.5h4.5l2-5h-3m2 0l-1-3h-2.5" />
        </svg>
      ),
    },
    {
      type: 'BigBike',
      title: 'บิ๊กไบค์',
      desc: 'สำหรับสายทัวร์ริ่งและผู้มีใบขับขี่ที่เหมาะสม',
      price: '฿1,200',
      btnText: 'ดูบิ๊กไบค์',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="6" cy="16.5" r="2.8" strokeWidth="1.8" />
          <circle cx="18" cy="16.5" r="2.8" strokeWidth="1.8" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8.8 16.5h4.2l2.5-6h-4l-2.7 3.5m6.7-3.5l-1.5-2.5h-2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white text-slate-900">
      {/* =========================================================
          1. HERO SECTION : สเกลขนาดกลางพอดีตา
         ========================================================= */}
      <section className="bg-gradient-to-b from-[#edf4ff] to-[#f8fbff] border-b border-blue-100/80 py-14 md:py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {/* หัวข้อด้านบน (ขนาดกลางพอดี) */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-slate-900 leading-tight mb-2.5">
              เช่ารถง่ายๆ <span className="text-[#1d64f2]">ใน 3 ขั้นตอน</span>
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              รถยนต์และมอเตอร์ไซค์ เลือกวันที่แล้วค้นหารถว่างได้ทันที
            </p>
          </div>

          {/* แถวแบ่งซ้าย (ฟอร์มค้นหา) - ขวา (ภาพรถสีน้ำเงินขนาดกลาง) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* การ์ดฟอร์มค้นหาฝั่งซ้าย */}
            <div className="lg:col-span-6 bg-white border border-gray-200/80 rounded-2xl p-6 shadow-md shadow-blue-900/5">
              {/* แท็บเลือกรถยนต์ / มอเตอร์ไซค์ */}
              <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setVehicleTab('car')}
                  className={`flex items-center justify-center gap-2 py-2 text-xs md:text-[13px] font-bold rounded-lg transition ${
                    vehicleTab === 'car'
                      ? 'bg-[#1d64f2] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13m-14 0h14m-14 0v4a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-4" />
                  </svg>
                  รถยนต์
                </button>
                <button
                  type="button"
                  onClick={() => setVehicleTab('motorcycle')}
                  className={`flex items-center justify-center gap-2 py-2 text-xs md:text-[13px] font-bold rounded-lg transition ${
                    vehicleTab === 'motorcycle'
                      ? 'bg-[#1d64f2] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="6.5" cy="16.5" r="2.5" strokeWidth="2" />
                    <circle cx="17.5" cy="16.5" r="2.5" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 16.5h4.5l2-5h-3" />
                  </svg>
                  มอเตอร์ไซค์
                </button>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                {/* จุดรับ-คืนรถ */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    จุดรับ-คืนรถ
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:border-[#1d64f2]"
                  >
                    <option value="">เลือกสถานที่รับ-คืนรถ</option>
                    <option value="สนามบินสุวรรณภูมิ">สนามบินสุวรรณภูมิ</option>
                    <option value="สนามบินดอนเมือง">สนามบินดอนเมือง</option>
                    <option value="ตัวเมืองเชียงใหม่">ตัวเมืองเชียงใหม่</option>
                    <option value="ตัวเมืองภูเก็ต">ตัวเมืองภูเก็ต</option>
                  </select>
                </div>

                {/* วันรับรถ - วันคืนรถ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      วันรับรถ
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-700 focus:outline-none focus:border-[#1d64f2]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      วันคืนรถ
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3.5 py-2 text-[13px] text-slate-700 focus:outline-none focus:border-[#1d64f2]"
                    />
                  </div>
                </div>

                {/* ปุ่มค้นหารถว่าง */}
                <button
                  type="submit"
                  className="w-full bg-[#1d64f2] hover:bg-blue-700 text-white font-bold text-[13px] py-3 rounded-xl transition shadow-sm mt-1"
                >
                  ค้นหารถว่าง
                </button>
              </form>
            </div>

            {/* ภาพประกอบรถสีน้ำเงินฝั่งขวา (ขนาดกลางสมดุลกับฟอร์ม) */}
            <div className="lg:col-span-6 flex justify-center">
              <svg
                className="w-full max-w-[390px] h-auto"
                viewBox="0 0 360 250"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* วงกลมพื้นหลัง */}
                <circle cx="195" cy="118" r="96" fill="#DCE8FC" />
                <circle cx="292" cy="65" r="18" fill="#D0E0FB" />
                {/* เส้นพื้นถนน */}
                <rect x="38" y="192" width="284" height="8" rx="4" fill="#C7D9F9" />
                {/* ตัวถังรถสีน้ำเงิน */}
                <path
                  d="M70 165C70 151 81 143 95 141L124 104C131 95 142 90 154 90H226C238 90 248 96 256 105L278 136C295 139 306 150 306 165V176C306 182 301 186 295 186H81C75 186 70 182 70 176V165Z"
                  fill="#1D64F2"
                />
                {/* กระจกหน้าต่างรถ */}
                <path
                  d="M134 106C138 101 144 98 151 98H223C230 98 236 101 240 106L258 131H115L134 106Z"
                  fill="#DBEAFE"
                />
                {/* เสากลางกระจก */}
                <rect x="184" y="98" width="6" height="33" fill="#1D64F2" />
                {/* ไฟหน้ารถ */}
                <rect x="289" y="150" width="14" height="7" rx="3.5" fill="#FACC15" />
                {/* ล้อหน้าและล้อหลัง */}
                <circle cx="124" cy="182" r="22.5" fill="#0F172A" />
                <circle cx="124" cy="182" r="9" fill="#E2E8F0" />
                <circle cx="252" cy="182" r="22.5" fill="#0F172A" />
                <circle cx="252" cy="182" r="9" fill="#E2E8F0" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          2. SECTION : เลือกประเภทรถ (4 การ์ด)
         ========================================================= */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-7 gap-2">
          <div>
            <h2 className="text-[22px] font-extrabold text-slate-900">เลือกประเภทรถ</h2>
            <p className="text-[13px] text-gray-500 mt-1">
              เลือกให้เหมาะกับการเดินทางของคุณ
            </p>
          </div>
          <Link
            to="/cars"
            className="text-[13px] font-bold text-[#1d64f2] hover:underline"
          >
            ดูรถทั้งหมด &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.type}
              className="bg-white border border-gray-200/80 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:border-blue-200 transition"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1d64f2] flex items-center justify-center mb-4">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-[15px] text-slate-900 mb-1.5">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-3">
                  เริ่มต้น{' '}
                  <span className="text-[17px] font-extrabold text-slate-900">
                    {cat.price}
                  </span>{' '}
                  / วัน
                </p>
                <Link
                  to={`/cars?type=${cat.type}`}
                  className="block w-full text-center bg-white hover:bg-blue-50 text-[#1d64f2] border border-blue-200 font-semibold text-xs py-2.5 rounded-xl transition"
                >
                  {cat.btnText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          3. SECTION : เช่าได้ใน 3 ขั้นตอน
         ========================================================= */}
      <section className="bg-[#f8fafc] border-t border-slate-100 py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[22px] font-extrabold text-slate-900 mb-7">
            เช่าได้ใน 3 ขั้นตอน
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* ขั้นตอนที่ 1 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="w-7 h-7 rounded-full bg-[#1d64f2] text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-bold text-[15px] text-slate-900 mb-1.5">
                เลือกรถและวันเดินทาง
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                ดูรถว่างตามวันที่และสถานที่รับรถ
              </p>
            </div>

            {/* ขั้นตอนที่ 2 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="w-7 h-7 rounded-full bg-[#1d64f2] text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-bold text-[15px] text-slate-900 mb-1.5">
                ยืนยันการจอง
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                กรอกข้อมูลผู้เช่าและชำระ [ค่ามัดจำ / วิธีชำระเงิน]
              </p>
            </div>

            {/* ขั้นตอนที่ 3 */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <span className="w-7 h-7 rounded-full bg-[#1d64f2] text-white font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <h3 className="font-bold text-[15px] text-slate-900 mb-1.5">
                รับรถและออกเดินทาง
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                แสดงบัตรและใบขับขี่ ตรวจสภาพรถร่วมกัน แล้วรับกุญแจ
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}