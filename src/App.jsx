import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import RequireRole from './components/RequireRole';

// หน้าทั่วไป
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import About from './pages/About';
import ApiLab from './pages/ApiLab';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// หน้าที่ต้องล็อกอิน
import MyBookings from './pages/MyBookings';
import Profile from './pages/Profile';

// หน้า Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCars from './pages/admin/AdminCars';
import AdminCarForm from './pages/admin/AdminCarForm';
import AdminBookings from './pages/admin/AdminBookings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white text-slate-900">
          <Navbar />

          <div className="flex-1 flex flex-col">
            <Routes>
              {/* หน้าสาธารณะ */}
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:id" element={<CarDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/api-lab" element={<ApiLab />} />
              <Route path="/apilab" element={<ApiLab />} />

              {/* หน้า Login / Register */}
              <Route
                path="/login"
                element={
                  <main className="max-w-5xl w-full mx-auto px-6 py-10 flex-1">
                    <Login />
                  </main>
                }
              />
              <Route
                path="/register"
                element={
                  <main className="max-w-5xl w-full mx-auto px-6 py-10 flex-1">
                    <Register />
                  </main>
                }
              />

              {/* หน้าที่ต้องล็อกอิน (User ทั่วไป) */}
              <Route
                path="/my-bookings"
                element={
                  <ProtectedRoute>
                    <main className="max-w-5xl w-full mx-auto px-6 py-10 flex-1">
                      <MyBookings />
                    </main>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <main className="max-w-5xl w-full mx-auto px-6 py-10 flex-1">
                      <Profile />
                    </main>
                  </ProtectedRoute>
                }
              />

              {/* โซน Admin (ต้องมี role === 'admin') */}
              <Route
                path="/admin"
                element={
                  <RequireRole role="admin">
                    <AdminLayout />
                  </RequireRole>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="cars" element={<AdminCars />} />
                <Route path="cars/new" element={<AdminCarForm />} />
                <Route path="cars/:id/edit" element={<AdminCarForm />} />
                <Route path="bookings" element={<AdminBookings />} />
              </Route>

              {/* หน้า 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}