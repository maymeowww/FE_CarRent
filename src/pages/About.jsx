import React from 'react';

export default function About() {
  return (
    <div className="bg-white flex-1 py-12 px-6 text-slate-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
          เกี่ยวกับ CarRent
        </h1>

        <p className="text-gray-600 text-base leading-relaxed mb-8">
          โปรเจกต์ฝึกหัดในรายวิชา 520 341 Client Side Web Programming ใช้เรียนรู้การเรียก API ด้วย
          React (fetch, useEffect, การจัดการสถานะ loading / error / success) และการเตรียมหน้าเว็บให้
          พร้อมเชื่อมกับ Backend ที่เขียนด้วย Go
        </p>

        <div className="mb-8">
          <h2 className="text-base font-bold text-slate-900">ทีม</h2>
          <p className="text-xs text-gray-400 mt-0.5 mb-3">
            รายชื่อสมาชิกผู้พัฒนาโปรเจกต์
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm font-semibold text-slate-800">
            <li>ญาดา จันทร์แสงดี (670710977)</li>
            <li>ณัฎฌา อิ่มหนำ (670710978)</li>
          </ul>
        </div>

        <hr className="border-gray-200 my-8" />

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-xs text-gray-500">
          <span className="font-extrabold text-sm text-[#1d64f2] tracking-wider whitespace-nowrap">
            TECH STACK
          </span>
          <p className="leading-relaxed">
            Frontend พัฒนาด้วย React &amp; Tailwind CSS (Deploy บน Vercel) เชื่อมต่อ REST API กับ Backend ภาษา Go (Deploy บน Render) และฐานข้อมูล PostgreSQL (Supabase)
          </p>
        </div>
      </div>
    </div>
  );
}