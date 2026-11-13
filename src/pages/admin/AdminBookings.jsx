import React, { useEffect, useState } from 'react';
import { backendApi } from '../../api/backend';
import { LoadingState, ErrorState, EmptyState } from '../../components/admin/AdminStates';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBookings = () => {
    setLoading(true);
    backendApi.getAllBookings()
      .then((data) => setBookings(data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await backendApi.updateBookingStatus(id, newStatus);
      loadBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadBookings} />;

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">จัดการรายการเช่ารถทั้งหมด</h1>
      {bookings.length === 0 ? (
        <EmptyState message="ยังไม่มีรายการจองในระบบ" />
      ) : (
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">ลูกค้า</th>
              <th className="p-3">รถที่จอง</th>
              <th className="p-3">วันที่รับ - คืน</th>
              <th className="p-3">ยอดรวม</th>
              <th className="p-3">สถานะ</th>
              <th className="p-3">ดำเนินการ</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b">
                <td className="p-3">{b.user_name || `User #${b.user_id}`}</td>
                <td className="p-3">{b.car_brand} {b.car_model}</td>
                <td className="p-3">{b.start_date} ถึง {b.end_date}</td>
                <td className="p-3">{Number(b.total_price).toLocaleString()} บาท</td>
                <td className="p-3 font-medium">{b.status}</td>
                <td className="p-3 space-x-2">
                  {b.status === 'pending' && (
                    <button onClick={() => handleStatusChange(b.id, 'approved')} className="bg-green-600 text-white px-2.5 py-1 rounded">
                      อนุมัติรับรถ
                    </button>
                  )}
                  {b.status === 'approved' && (
                    <button onClick={() => handleStatusChange(b.id, 'completed')} className="bg-blue-600 text-white px-2.5 py-1 rounded">
                      ยืนยันคืนรถ
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}