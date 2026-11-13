import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  test('คำนวณจำนวนวันและราคารวมถูกต้องเมื่อเลือกวันที่รับ-คืนรถ', () => {
    const mockSubmit = jest.fn();
    render(<BookingForm pricePerDay={1200} onSubmit={mockSubmit} isSubmitting={false} />);

    fireEvent.change(screen.getByLabelText(/วันที่รับรถ/i), { target: { value: '2026-11-15' } });
    fireEvent.change(screen.getByLabelText(/วันที่คืนรถ/i), { target: { value: '2026-11-17' } });

    expect(screen.getByTestId('total-days')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('2,400');

    fireEvent.click(screen.getByRole('button', { name: /ยืนยันการจองรถ/i }));
    expect(mockSubmit).toHaveBeenCalledWith({
      start_date: '2026-11-15',
      end_date: '2026-11-17',
      total_price: 2400,
    });
  });
});