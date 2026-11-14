const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8080').replace(/\/$/, '');

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const e = data.error;
    throw new Error(
      typeof e === 'string'
        ? e
        : e?.message || data.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์'
    );
  }
  return data;
}

// รองรับทั้ง array ตรงๆ และ { items: [...] }
const toList = (d) => (Array.isArray(d) ? d : d?.items || []);

export const backendApi = {
  // Auth
  login: (credentials) => request('/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/register', { method: 'POST', body: JSON.stringify(userData) }),

  // Guest & Member
  getCars: async () => toList(await request('/cars')),
  getCarById: (id) => request(`/cars/${id}`),
  createBooking: (bookingData) => request('/bookings', { method: 'POST', body: JSON.stringify(bookingData) }),
  getMyBookings: async () => toList(await request('/bookings/me')),
  cancelBooking: (id) => request(`/bookings/${id}/cancel`, { method: 'PATCH' }),

  // Admin
  createCar: (carData) => request('/admin/cars', { method: 'POST', body: JSON.stringify(carData) }),
  updateCar: (id, carData) => request(`/admin/cars/${id}`, { method: 'PUT', body: JSON.stringify(carData) }),
  deleteCar: (id) => request(`/admin/cars/${id}`, { method: 'DELETE' }),
  getAllBookings: async () => toList(await request('/admin/bookings')),
  updateBookingStatus: (id, status) =>
    request(`/admin/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};