import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../app/providers/AuthProvider';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate('/admin/dashboard');
        } else {
            alert("Ошибка входа: Проверьте логин/пароль (admin/admin)");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Вход в Админ-Панель</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Логин (admin)" value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                <input type="password" placeholder="Пароль (admin)" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', marginBottom: '15px' }} />
                <button type="submit" style={{ padding: '10px 20px' }}>Войти</button>
            </form>
        </div>
    );
};

export default AdminLogin;