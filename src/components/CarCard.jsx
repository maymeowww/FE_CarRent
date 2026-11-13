import React from 'react';
import { Link } from 'react-router-dom';

export default function CarCard({ car }) {
  const isAvailable = car.status === 'available';

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:border-[#1d64f2] hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative">
          <img
            src={car.image_url || 'https://placehold.co/600x400/ebf3ff/1d64f2?text=Car+Image'}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-48 object-cover"
          />
          <span
            className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold ${
              isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {isAvailable ? 'ว่างพร้อมเช่า' : 'ไม่ว่าง'}
          </span>
        </div>

        <div className="p-5">
          <p className="text-xs font-medium text-[#1d64f2] mb-1">{car.car_type || 'รถยนต์'}</p>
          <h3 className="font-bold text-lg text-slate-900 mb-2">{car.brand} {car.model}</h3>
          <p className="text-slate-900 font-extrabold text-xl">
            ฿{Number(car.price_per_day).toLocaleString()} <span className="text-xs font-normal text-gray-500">/ วัน</span>
          </p>
        </div>
      </div>

      <div className="px-5 pb-5">
        <Link
          to={`/cars/${car.id}`}
          className="block w-full text-center bg-[#1d64f2] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition"
        >
          ดูรายละเอียดและจอง
        </Link>
      </div>
    </div>
  );
}