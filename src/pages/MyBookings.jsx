import React, { useEffect, useState } from 'react';
import { backendApi } from '../api/backend';
import { LoadingState, ErrorState, EmptyState } from '../components/admin/AdminStates';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBookings = () => {
    setLoading(true);
    backendApi.getMyBookings()
      .then((data) => setBookings(data || []))
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
          {bookings.map((b) => (
            <div key={b.id} className="p-4 bg-white border rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="font-bold text-lg">{b.car_brand} {b.car_model}</h3>
                <p className="text-sm text-gray-600">วันที่รับรถ: {b.start_date} | วันที่คืนรถ: {b.end_date}</p>
                <p className="font-semibold text-blue-600">ยอดรวม: {Number(b.total_price).toLocaleString()} บาท</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-sm bg-gray-100 font-medium">
                  สถานะ: {b.status}
                </span>
                {b.status === 'pending' && (
                  <button
                    onClick={() => handleCancel(b.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    ยกเลิกการจอง
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}