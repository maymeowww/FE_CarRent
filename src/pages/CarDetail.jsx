import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { backendApi } from '../api/backend';
import { useAuth } from '../auth/AuthContext';
import BookingForm from '../components/BookingForm';
import { LoadingState, ErrorState } from '../components/admin/AdminStates';

export default function CarDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    backendApi.getCarById(id)
      .then((data) => setCar(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBooking = async (bookingPayload) => {
    try {
      setSubmitting(true);
      await backendApi.createBooking({ car_id: Number(id), ...bookingPayload });
      alert('จองรถสำเร็จ! กรุณารอเจ้าหน้าที่อนุมัติ');
      navigate('/my-bookings');
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!car) return <ErrorState message="ไม่พบข้อมูลรถคันนี้" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-xl border shadow-sm">
      <div>
        <img
          src={car.image_url || 'https://placehold.co/600x400?text=Car+Image'}
          alt={car.model}
          className="w-full h-72 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{car.brand} {car.model}</h1>
        <p className="text-gray-600 mb-2">ประเภท: {car.car_type || 'ทั่วไป'} | ทะเบียน: {car.license_plate || '-'}</p>
        <p className="text-2xl font-bold text-blue-600 mb-4">
          {Number(car.price_per_day).toLocaleString()} บาท / วัน
        </p>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          car.status === 'available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          สถานะ: {car.status === 'available' ? 'พร้อมให้บริการ' : 'ไม่ว่าง'}
        </span>
      </div>

      <div>
        {car.status !== 'available' ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center text-red-700">
            รถคันนี้ถูกเช่าหรืออยู่ระหว่างซ่อมบำรุง ไม่สามารถจองได้ในขณะนี้
          </div>
        ) : !user ? (
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-center space-y-4">
            <h3 className="font-bold text-lg text-amber-900">ต้องการจองรถคันนี้ใช่ไหม?</h3>
            <p className="text-sm text-amber-800">กรุณาเข้าสู่ระบบหรือสมัครสมาชิกก่อนทำรายการจองรถ</p>
            <div className="flex justify-center gap-3">
              <Link to="/login" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                เข้าสู่ระบบ
              </Link>
              <Link to="/register" className="bg-white border border-gray-300 px-5 py-2 rounded hover:bg-gray-50">
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        ) : (
          <BookingForm
            pricePerDay={car.price_per_day}
            onSubmit={handleBooking}
            isSubmitting={submitting}
          />
        )}
      </div>
    </div>
  );
}