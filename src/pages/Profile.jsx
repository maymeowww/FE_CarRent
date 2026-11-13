import React, { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { backendApi } from '../api/backend';

export default function Profile() {
  const { user, updateUserState } = useAuth();
  const [profileForm, setProfileForm] = useState({
    full_name: user?.full_name || '',
    phone: user?.phone || '',
    driver_license: user?.driver_license || '',
  });
  const [passForm, setPassForm] = useState({ old_password: '', new_password: '' });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updated = await backendApi.updateProfile(profileForm);
      updateUserState({ ...user, ...updated });
      alert('อัปเดตข้อมูลส่วนตัวสำเร็จ');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await backendApi.changePassword(passForm);
      alert('เปลี่ยนรหัสผ่านสำเร็จ');
      setPassForm({ old_password: '', new_password: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4">ข้อมูลส่วนตัว ({user?.email})</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
            <input type="text" value={profileForm.full_name} onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
            <input type="text" value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">เลขที่ใบขับขี่</label>
            <input type="text" value={profileForm.driver_license} onChange={(e) => setProfileForm({ ...profileForm, driver_license: e.target.value })} className="w-full border p-2 rounded" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">บันทึกข้อมูล</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h2 className="text-xl font-bold mb-4">เปลี่ยนรหัสผ่าน</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">รหัสผ่านปัจจุบัน</label>
            <input type="password" value={passForm.old_password} onChange={(e) => setPassForm({ ...passForm, old_password: e.target.value })} className="w-full border p-2 rounded" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">รหัสผ่านใหม่</label>
            <input type="password" value={passForm.new_password} onChange={(e) => setPassForm({ ...passForm, new_password: e.target.value })} className="w-full border p-2 rounded" required />
          </div>
          <button type="submit" className="bg-slate-800 text-white px-5 py-2 rounded hover:bg-slate-700">เปลี่ยนรหัสผ่าน</button>
        </form>
      </div>
    </div>
  );
}