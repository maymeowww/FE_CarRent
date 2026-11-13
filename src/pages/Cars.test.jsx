import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Cars from './Cars';
import { backendApi } from '../api/backend';

jest.mock('../api/backend');

describe('Cars Page', () => {
  test('แสดงสถานะ Loading และแสดงรายการรถเมื่อดึงข้อมูลสำเร็จ', async () => {
    backendApi.getCars.mockResolvedValue([
      { id: 1, brand: 'Toyota', model: 'Yaris', car_type: 'Eco', price_per_day: 900, status: 'available' },
    ]);

    render(<BrowserRouter><Cars /></BrowserRouter>);

    expect(screen.getByText(/กำลังโหลดข้อมูล/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Toyota Yaris')).toBeInTheDocument();
    });
  });

  test('แสดงสถานะ Empty เมื่อไม่มีข้อมูลรถ', async () => {
    backendApi.getCars.mockResolvedValue([]);

    render(<BrowserRouter><Cars /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText(/ไม่พบรายการรถที่ตรงกับเงื่อนไข/i)).toBeInTheDocument();
    });
  });
});