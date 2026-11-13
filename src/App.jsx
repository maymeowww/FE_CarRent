import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import About from './pages/About';
import ApiLab from './pages/ApiLab';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white text-slate-900">
          <Navbar />

          <div className="flex-1 flex flex-col">
            <Routes>
              {/* หน้าที่กางพื้นหลังเต็มความกว้างจอ */}
              <Route path="/" element={<Home />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/about" element={<About />} />
              <Route path="/api-lab" element={<ApiLab />} />
              <Route path="/apilab" element={<ApiLab />} />

              {/* หน้าที่จัดกึ่งกลางในกรอบ */}
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
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}