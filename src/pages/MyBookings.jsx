import React, { useEffect, useState } from 'react';
import { backendApi } from '../api/backend';
import { LoadingState, ErrorState, EmptyState } from '../components/admin/AdminStates';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBookings = () => {
    setLoading(true);
    setError(null);
    backendApi.getMyBookings()
      .then((data) => {
        // รองรับทั้งรูปแบบ Array ตรงๆ และรูปแบบ { items: [...] } หรือ { bookings: [...] }
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.items)
          ? data.items
          : Array.isArray(data?.bookings)
          ? data.bookings
          : [];
        setBookings(list);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('ยืนยันการยกเลิกการจองนี้?')) return;
    try {
      await backendApi.cancelBooking(id);
      loadBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadBookings} />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ประวัติการเช่ารถของฉัน</h1>
      {bookings.length === 0 ? (
        <EmptyState message="คุณยังไม่มีประวัติการเช่ารถ" />
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => {
            const brand = b.car_brand || b.car?.brand || '';
            const model = b.car_model || b.car?.model || b.car_name || `รถรหัส #${b.car_id}`;
            const startDate = (b.start_date || '').split('T')[0];
            const endDate = (b.end_date || '').split('T')[0];

            return (
              <div
                key={b.id}
                className="p-4 bg-white border rounded-lg flex flex-col md:flex-row justify-between items-center gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg">
                    {brand} {model}
                  </h3>
                  <p className="text-sm text-gray-600">
                    วันที่รับรถ: {startDate} | วันที่คืนรถ: {endDate}
                  </p>
                  <p className="font-semibold text-blue-600">
                    ยอดรวม: {Number(b.total_price || 0).toLocaleString()} บาท
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100 font-medium">
                    สถานะ: {b.status}
                  </span>
                  {(b.status === 'pending' || b.status === 'confirmed') && (
                    <button
                      onClick={() => handleCancel(b.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      ยกเลิกการจอง
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}