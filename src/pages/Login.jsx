import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    setLoading(true);
    try {
      if (auth?.login) {
        await auth.login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white flex-1 py-16 px-6 text-slate-900">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-6">
          เข้าสู่ระบบ
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="อีเมล"
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:border-[#1d64f2] transition"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่าน"
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:border-[#1d64f2] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1d64f2] hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold text-sm py-3 rounded-xl transition shadow-xs mt-1"
          >
            {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-5">
          ยังไม่มีบัญชี?{' '}
          <Link to="/register" className="text-[#1d64f2] font-semibold hover:underline">
            สมัครสมาชิก
          </Link>
        </p>
      </div>
    </div>
  );
}