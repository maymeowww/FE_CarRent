// src/pages/admin/AdminCarForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { backendApi } from '../../api/backend';

export default function AdminCarForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    brand: '',
    model: '',
    car_type: 'Sedan',
    license_plate: '',
    price_per_day: 1000,
    image_url: '',
    status: 'available',
  });

  useEffect(() => {
    if (isEdit) {
      backendApi.getCarById(id).then((data) => setForm(data)).catch((err) => alert(err.message));
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price_per_day: Number(form.price_per_day) };
      if (isEdit) {
        await backendApi.updateCar(id, payload);
      } else {
        await backendApi.createCar(payload);
      }
      navigate('/admin/cars');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h1 className="text-xl font-bold">{isEdit ? 'แก้ไขข้อมูลรถ' : 'เพิ่มรถคันใหม่'}</h1>
      <div>
        <label className="block text-sm font-medium mb-1">ยี่ห้อ (Brand)</label>
        <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">รุ่น (Model)</label>
        <input type="text" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">ประเภทรถ</label>
        <select value={form.car_type} onChange={(e) => setForm({ ...form, car_type: e.target.value })} className="w-full border p-2 rounded">
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Eco">Eco</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">ทะเบียนรถ</label>
        <input type="text" value={form.license_plate} onChange={(e) => setForm({ ...form, license_plate: e.target.value })} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">ราคาเช่าต่อวัน (บาท)</label>
        <input type="number" value={form.price_per_day} onChange={(e) => setForm({ ...form, price_per_day: e.target.value })} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">ลิงก์รูปภาพรถ (URL)</label>
        <input type="text" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">สถานะรถ</label>
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full border p-2 rounded">
          <option value="available">พร้อมเช่า (available)</option>
          <option value="rented">ถูกเช่าอยู่ (rented)</option>
          <option value="maintenance">ซ่อมบำรุง (maintenance)</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">บันทึกข้อมูล</button>
    </form>
  );
}