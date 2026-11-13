// src/pages/admin/AdminCars.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { backendApi } from '../../api/backend';
import { LoadingState, ErrorState, EmptyState } from '../../components/admin/AdminStates';

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCars = () => {
    setLoading(true);
    backendApi.getCars()
      .then((data) => setCars(data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('ยืนยันการลบข้อมูลรถคันนี้?')) return;
    try {
      await backendApi.deleteCar(id);
      loadCars();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={loadCars} />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">จัดการข้อมูลรถ</h1>
        <Link to="/admin/cars/new" className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
          + เพิ่มรถใหม่
        </Link>
      </div>

      {cars.length === 0 ? (
        <EmptyState message="ยังไม่มีรถในระบบ" />
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-3">รุ่นรถ</th>
              <th className="p-3">ราคา/วัน</th>
              <th className="p-3">สถานะ</th>
              <th className="p-3">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id} className="border-b">
                <td className="p-3">{car.brand} {car.model}</td>
                <td className="p-3">{Number(car.price_per_day).toLocaleString()} บาท</td>
                <td className="p-3">{car.status}</td>
                <td className="p-3 space-x-2">
                  <Link to={`/admin/cars/edit/${car.id}`} className="text-blue-600 hover:underline text-sm">แก้ไข</Link>
                  <button onClick={() => handleDelete(car.id)} className="text-red-600 hover:underline text-sm">ลบ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}