import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const BASE_URL = 'https://stroi-dvor-backend.onrender.com';
const AUTH_API = `${BASE_URL}/api/auth`;

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAdmin(true); 
        } else {
            delete axios.defaults.headers.common['Authorization'];
            setIsAdmin(false);
        }
        setIsLoading(false);
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await axios.post(`${AUTH_API}/login`, { username, password });
            const newToken = response.data.token;
            localStorage.setItem('adminToken', newToken);
            setToken(newToken);
            return true;
        } catch (error) {
            console.error("Login failed:", error.response?.data?.message || "Network Error");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        setToken(null);
    };

    if (isLoading) {
        return <div>...</div>;
    }

    return (
        <AuthContext.Provider value={{ token, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);