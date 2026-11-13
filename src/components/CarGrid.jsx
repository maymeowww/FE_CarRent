// src/components/CarGrid.jsx
import React from 'react';
import CarCard from './CarCard';
import { EmptyState } from './admin/AdminStates';

export default function CarGrid({ cars }) {
  if (!cars || cars.length === 0) {
    return <EmptyState message="ไม่พบรายการรถที่ตรงกับเงื่อนไข" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}