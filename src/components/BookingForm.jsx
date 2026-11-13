import React, { useState } from 'react';

export default function BookingForm({ pricePerDay, onSubmit, isSubmitting }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = new Date(endDate) - new Date(startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const days = calculateDays();
  const totalPrice = days * pricePerDay;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (days <= 0) {
      setError('วันที่คืนรถต้องอยู่หลังวันที่รับรถอย่างน้อย 1 วัน');
      return;
    }
    setError('');
    onSubmit({ start_date: startDate, end_date: endDate, total_price: totalPrice });
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 border rounded-lg bg-gray-50 space-y-4">
      <h3 className="font-bold text-lg">ทำรายการจองรถ</h3>
      {error && <p className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</p>}

      <div>
        <label htmlFor="start-date" className="block text-sm font-medium mb-1">วันที่รับรถ</label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full border p-2 rounded bg-white"
          required
        />
      </div>

      <div>
        <label htmlFor="end-date" className="block text-sm font-medium mb-1">วันที่คืนรถ</label>
        <input
          id="end-date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full border p-2 rounded bg-white"
          required
        />
      </div>

      <div className="p-3 bg-white rounded border space-y-1">
        <p className="text-sm text-gray-600">จำนวนวันเช่า: <span data-testid="total-days" className="font-semibold">{days}</span> วัน</p>
        <p className="font-bold text-blue-600 text-lg">
          ราคารวม: <span data-testid="total-price">{totalPrice.toLocaleString()}</span> บาท
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2.5 rounded font-medium hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isSubmitting ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันการจองรถ'}
      </button>
    </form>
  );
}