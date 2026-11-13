import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-blue-100 text-xs text-gray-500 mt-auto">
      <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 leading-relaxed">
        {/* ฝั่งซ้าย : ชื่อโปรเจกต์และรายวิชา */}
        <p className="max-w-xs">
          CarRent โปรเจกต์ประกอบวิชา 520 341 คณะวิทยาศาสตร์ มหาวิทยาลัยศิลปากร
        </p>

        {/* ฝั่งขวา : ข้อมูลระบบและเทคโนโลยี */}
        <p className="max-w-xs sm:text-right">
          เชื่อมต่อ REST API ด้วย{' '}
          <span className="text-[#1d64f2] underline">Go &amp; PostgreSQL</span>{' '}
          พัฒนาส่วนติดต่อผู้ใช้ด้วย React และ Tailwind CSS
        </p>
      </div>
    </footer>
  );
}