import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../auth/AuthContext';

jest.mock('../auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('ProtectedRoute Component', () => {
  test('อนุญาตให้เข้าถึงหน้าของสมาชิกได้เมื่อ Login แล้ว', () => {
    useAuth.mockReturnValue({
      user: { id: 2, full_name: 'Member User', role: 'member' },
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/my-bookings']}>
        <Routes>
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <div>ประวัติการจองของฉัน</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>หน้าเข้าสู่ระบบ</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('ประวัติการจองของฉัน')).toBeInTheDocument();
  });

  test('เด้งไปหน้า Login เมื่อเป็น Guest (ยังไม่ Login)', () => {
    useAuth.mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/my-bookings']}>
        <Routes>
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <div>ประวัติการจองของฉัน</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>หน้าเข้าสู่ระบบ</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('ประวัติการจองของฉัน')).not.toBeInTheDocument();
    expect(screen.getByText('หน้าเข้าสู่ระบบ')).toBeInTheDocument();
  });
});