import React, { useEffect, useState, useCallback } from 'react';
import { backendApi } from '../../api/backend';

const STATUS_CONFIG = {
  pending: {
    label: 'รอดำเนินการ',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500',
  },
  confirmed: {
    label: 'อนุมัติแล้ว',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
  },
  completed: {
    label: 'เสร็จสิ้น',
    badgeClass: 'bg-blue-50 text-[#1d64f2] border-blue-200',
    dotClass: 'bg-[#1d64f2]',
  },
  cancelled: {
    label: 'ไม่อนุมัติ / ยกเลิก',
    badgeClass: 'bg-red-50 text-red-600 border-red-200',
    dotClass: 'bg-red-500',
  },
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [carsMap, setCarsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [updatingId, setUpdatingId] = useState(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [bookingsRes, carsRes] = await Promise.all([
        backendApi.getAllBookings(),
        backendApi.getCars().catch(() => ({ items: [] })),
      ]);

      const bookingList = Array.isArray(bookingsRes)
        ? bookingsRes
        : Array.isArray(bookingsRes?.items)
        ? bookingsRes.items
        : Array.isArray(bookingsRes?.bookings)
        ? bookingsRes.bookings
        : [];

      const carList = Array.isArray(carsRes)
        ? carsRes
        : Array.isArray(carsRes?.items)
        ? carsRes.items
        : [];

      const map = {};
      carList.forEach((c) => {
        if (c?.id != null) map[c.id] = c;
      });

      const sorted = [...bookingList].sort((a, b) => (b.id || 0) - (a.id || 0));
      setCarsMap(map);
      setBookings(sorted);
    } catch (err) {
      setError(err.message || 'ไม่สามารถโหลดรายการจองได้');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (id, newStatus, confirmText) => {
    if (!window.confirm(confirmText)) return;
    setUpdatingId(id);
    try {
      await backendApi.updateBookingStatus(id, newStatus);
      await loadData();
    } catch (err) {
      alert(err.message || 'ไม่สามารถอัปเดตสถานะการจองได้');
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const clean = dateStr.split('T')[0];
    const date = new Date(clean);
    if (Number.isNaN(date.getTime())) return clean;
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'ALL') return true;
    return (b.status || '').toLowerCase() === filterStatus;
  });

  return (
    <div className="space-y-6 text-slate-900">
      {/* ส่วนหัวหน้า */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
          จัดการรายการเช่า
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          ตรวจสอบคำขอเช่ารถ กดอนุมัติหรือไม่อนุมัติ และอัปเดตสถานะเมื่อลูกค้าคืนรถ
        </p>
      </div>

      {/* แถบตัวกรองสถานะ */}
      {!loading && !error && bookings.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {[
            { key: 'ALL', label: `ทั้งหมด (${bookings.length})` },
            { key: 'pending', label: 'รอดำเนินการ' },
            { key: 'confirmed', label: 'อนุมัติแล้ว' },
            { key: 'completed', label: 'เสร็จสิ้น' },
            { key: 'cancelled', label: 'ไม่อนุมัติ / ยกเลิก' },
          ].map((tab) => {
            const active = filterStatus === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilterStatus(tab.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                  active
                    ? 'bg-[#1d64f2] text-white border-[#1d64f2]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-[#1d64f2]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* สถานะกำลังโหลด */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* สถานะ Error */}
      {!loading && error && (
        <div className="bg-red-50/80 border border-red-200 rounded-2xl py-10 px-6 text-center">
          <h3 className="text-base font-bold text-red-700 mb-1">เกิดข้อผิดพลาด</h3>
          <p className="text-sm text-red-600 mb-5">{error}</p>
          <button
            type="button"
            onClick={loadData}
            className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition"
          >
            ลองใหม่อีกครั้ง
          </button>
        </div>
      )}

      {/* สถานะไม่มีรายการจอง */}
      {!loading && !error && bookings.length === 0 && (
        <div className="bg-slate-50/70 border border-dashed border-slate-300 rounded-2xl py-14 px-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1d64f2] flex items-center justify-center text-xl mx-auto mb-3">
            📋
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            ยังไม่มีรายการเช่ารถในระบบ
          </h3>
          <p className="text-xs text-slate-500">
            เมื่อลูกค้ากดจองรถ รายการจะแสดงในตารางนี้เพื่อให้ตรวจสอบและอนุมัติ
          </p>
        </div>
      )}

      {/* ตารางรายการจอง */}
      {!loading && !error && bookings.length > 0 && (
        <div className="border border-slate-200/80 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase">
                  <th className="py-3.5 px-4">รหัส / รถที่เช่า</th>
                  <th className="py-3.5 px-4">ผู้เช่า</th>
                  <th className="py-3.5 px-4">ช่วงวันเช่า</th>
                  <th className="py-3.5 px-4">ยอดรวม</th>
                  <th className="py-3.5 px-4">สถานะ</th>
                  <th className="py-3.5 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">
                      ไม่พบรายการจองในสถานะที่เลือก
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((b) => {
                    const carInfo = carsMap[b.car_id] || b.car || {};
                    const brand = b.car_brand || carInfo.brand || '';
                    const model =
                      b.car_model ||
                      carInfo.model ||
                      carInfo.name ||
                      (b.car_id ? `รถรหัส #${b.car_id}` : 'รายการเช่า');
                    const customerName =
                      b.user_name ||
                      b.customer_name ||
                      b.user?.name ||
                      b.user?.email ||
                      (b.user_id ? `สมาชิก #${b.user_id}` : '-');

                    const statusKey = (b.status || 'pending').toLowerCase();
                    const statusStyle = STATUS_CONFIG[statusKey] || {
                      label: b.status || 'ไม่ระบุ',
                      badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
                      dotClass: 'bg-slate-500',
                    };

                    const isBusy = updatingId === b.id;

                    return (
                      <tr key={b.id} className="hover:bg-slate-50/60 transition">
                        {/* รหัส + ชื่อรถ */}
                        <td className="py-3.5 px-4">
                          <span className="text-[11px] font-semibold text-slate-400 block">
                            #{b.id}
                          </span>
                          <span className="font-bold text-slate-900">
                            {brand} {model}
                          </span>
                        </td>

                        {/* ผู้เช่า */}
                        <td className="py-3.5 px-4 text-slate-600 text-xs font-medium">
                          {customerName}
                        </td>

                        {/* ช่วงวันเช่า */}
                        <td className="py-3.5 px-4 text-xs text-slate-600">
                          <div>รับ: {formatDate(b.start_date)}</div>
                          <div>คืน: {formatDate(b.end_date)}</div>
                        </td>

                        {/* ยอดรวม */}
                        <td className="py-3.5 px-4 font-bold text-[#1d64f2]">
                          ฿{Number(b.total_price || 0).toLocaleString()}
                        </td>

                        {/* ป้ายสถานะ */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusStyle.badgeClass}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${statusStyle.dotClass}`}
                            />
                            {statusStyle.label}
                          </span>
                        </td>

                        {/* ปุ่มจัดการ (อนุมัติ / ไม่อนุมัติ / เสร็จสิ้น) */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center justify-end gap-2">
                            {statusKey === 'pending' && (
                              <>
                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() =>
                                    handleStatusChange(
                                      b.id,
                                      'confirmed',
                                      `ยืนยันการ "อนุมัติ" รายการจอง #${b.id} หรือไม่?`
                                    )
                                  }
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 transition shadow-2xs"
                                >
                                  {isBusy ? '...' : 'อนุมัติ'}
                                </button>
                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() =>
                                    handleStatusChange(
                                      b.id,
                                      'cancelled',
                                      `ยืนยันการ "ไม่อนุมัติ" รายการจอง #${b.id} หรือไม่?`
                                    )
                                  }
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white disabled:opacity-50 transition"
                                >
                                  {isBusy ? '...' : 'ไม่อนุมัติ'}
                                </button>
                              </>
                            )}

                            {statusKey === 'confirmed' && (
                              <>
                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() =>
                                    handleStatusChange(
                                      b.id,
                                      'completed',
                                      `ยืนยันการคืนรถและปิดงานรายการ #${b.id} หรือไม่?`
                                    )
                                  }
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1d64f2] text-white hover:bg-blue-700 disabled:opacity-50 transition"
                                >
                                  {isBusy ? '...' : 'คืนรถแล้ว (เสร็จสิ้น)'}
                                </button>
                                <button
                                  type="button"
                                  disabled={isBusy}
                                  onClick={() =>
                                    handleStatusChange(
                                      b.id,
                                      'cancelled',
                                      `ยืนยันการยกเลิกรายการจอง #${b.id} หรือไม่?`
                                    )
                                  }
                                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white disabled:opacity-50 transition"
                                >
                                  ยกเลิก
                                </button>
                              </>
                            )}

                            {(statusKey === 'completed' || statusKey === 'cancelled') && (
                              <span className="text-xs text-slate-400">ดำเนินการแล้ว</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}