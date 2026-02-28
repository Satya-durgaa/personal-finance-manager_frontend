import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        try {
            if (token && storedUser && storedUser !== 'undefined') {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to parse user from local storage:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        // In a real app, this would call your backend which talks to Supabase
        // For this prototype, we'll simulate the flow or expect the backend to be ready
        try {
            // Assuming backend has a /auth/login route
            const response = await api.post('/auth/login', { email, password });
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || 'Login failed' };
        }
    };

    const signup = async (email, password, fullName) => {
        try {
            const response = await api.post('/auth/signup', { email, password, fullName });
            const { user, token } = response.data;
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
            }
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.error || 'Signup failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
