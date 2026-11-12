import React, { createContext, useContext, useState } from 'react';
const C = createContext(null);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('carrent_user') || 'null'));
    const save = u => { setUser(u); localStorage.setItem('carrent_user', JSON.stringify(u)); };
    const register = ({ name, email, password }) => { const all = JSON.parse(localStorage.getItem('carrent_users') || '[]'); if (all.some(x => x.email === email)) throw Error('อีเมลนี้ถูกใช้แล้ว'); all.push({ name, email, password, role: 'member' }); localStorage.setItem('carrent_users', JSON.stringify(all)); save({ name, email, role: 'member' }); };
    const login = ({ email, password }) => {
        const u = JSON.parse(
            localStorage.getItem('carrent_users') || '[]'
        ).find(x => x.email === email && x.password === password);

        if (!u) throw Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง');

        save({
            name: u.name,
            email: u.email,
            role: u.role
        });
    };
    const logout = () => { setUser(null); localStorage.removeItem('carrent_user'); };
    return <C.Provider value={{ user, register, login, logout }}>{children}</C.Provider>
}
export const useAuth = () => useContext(C);