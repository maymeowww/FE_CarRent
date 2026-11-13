import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RequireRole from './RequireRole';
import { useAuth } from '../auth/AuthContext';

// จำลอง useAuth เพื่อกำหนดสถานะผู้ใช้แต่ละแบบในการทดสอบ
jest.mock('../auth/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('RequireRole Component', () => {
  test('อนุญาตให้เข้าถึงหน้า Admin ได้เมื่อผู้ใช้มี role เป็น admin', () => {
    useAuth.mockReturnValue({
      user: { id: 1, full_name: 'Admin User', role: 'admin' },
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={
              <RequireRole role="admin">
                <div>หน้าจัดการระบบสำหรับ Admin</div>
              </RequireRole>
            }
          />
          <Route path="/" element={<div>หน้าหลัก</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('หน้าจัดการระบบสำหรับ Admin')).toBeInTheDocument();
  });

  test('ปฏิเสธการเข้าถึงและเด้งกลับหน้าหลักเมื่อผู้ใช้เป็น member ธรรมดา', () => {
    useAuth.mockReturnValue({
      user: { id: 2, full_name: 'Normal Member', role: 'member' },
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={
              <RequireRole role="admin">
                <div>หน้าจัดการระบบสำหรับ Admin</div>
              </RequireRole>
            }
          />
          <Route path="/" element={<div>หน้าหลัก</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('หน้าจัดการระบบสำหรับ Admin')).not.toBeInTheDocument();
    expect(screen.getByText('หน้าหลัก')).toBeInTheDocument();
  });

  test('เด้งไปหน้า Login เมื่อยังไม่ได้เข้าสู่ระบบ (Guest)', () => {
    useAuth.mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={
              <RequireRole role="admin">
                <div>หน้าจัดการระบบสำหรับ Admin</div>
              </RequireRole>
            }
          />
          <Route path="/login" element={<div>หน้าเข้าสู่ระบบ</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('หน้าจัดการระบบสำหรับ Admin')).not.toBeInTheDocument();
    expect(screen.getByText('หน้าเข้าสู่ระบบ')).toBeInTheDocument();
  });
});