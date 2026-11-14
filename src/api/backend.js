const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

//ตัวกลางดึงคำสั่ง api จากทุกหน้า
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  //การส่งคำขอไปยังเซิร์ฟเวอร์ด้วย fetch
  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  
  //แปลงข้อมูลและการดักจับข้อผิดพลาด
  const data = await res.json().catch(() => ({}));

if (!res.ok) {
  const e = data.error;
  throw new Error(typeof e === 'string' ? e : e?.message || data.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
}
  return data;
}

export const backendApi = {
  // ระบบสมาชิก (Auth & Profile)
  login: (credentials) => request('/api/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/api/register', { method: 'POST', body: JSON.stringify(userData) }),
  getProfile: () => request('/api/profile'),
  updateProfile: (profileData) => request('/api/profile', { method: 'PUT', body: JSON.stringify(profileData) }),
  changePassword: (passwords) => request('/api/change-password', { method: 'PUT', body: JSON.stringify(passwords) }),

  // ส่วนของ Guest & Member
  getCars: async () => (await request('/api/cars')).items || [],
  getCarById: (id) => request(`/api/cars/${id}`),
  createBooking: (bookingData) => request('/api/bookings', { method: 'POST', body: JSON.stringify(bookingData) }),
  getMyBookings: () => request('/api/bookings/me'),
  cancelBooking: (id) => request(`/api/bookings/${id}/cancel`, { method: 'PUT' }),

  // ส่วนของ Admin
  createCar: (carData) => request('/api/admin/cars', { method: 'POST', body: JSON.stringify(carData) }),
  updateCar: (id, carData) => request(`/api/admin/cars/${id}`, { method: 'PUT', body: JSON.stringify(carData) }),
  deleteCar: (id) => request(`/api/admin/cars/${id}`, { method: 'DELETE' }),
  getAllBookings: async () => (await request('/api/admin/bookings')).items || [],
  updateBookingStatus: (id, status) => request(`/api/admin/bookings/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
};