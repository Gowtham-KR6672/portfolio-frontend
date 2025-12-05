import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('token', data.token); // Save token separately
            window.location.href = '/admin';
        } catch (error) {
            console.error(error);
            alert('Invalid email or password');
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form className="glass-panel" onSubmit={handleLogin} style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 className="neon-text" style={{ textAlign: 'center' }}>Admin Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px', outline: 'none' }}
                />

                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '12px', paddingRight: '40px', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-color)', borderRadius: '5px', outline: 'none' }}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--text-color)', fontSize: '1.2rem' }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '15px', marginTop: '10px' }}>
                    <button type="submit" style={{ flex: 1, padding: '12px', background: 'var(--primary-color)', border: 'none', color: '#fff', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px', transition: '0.3s' }}>
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => window.location.href = '/'}
                        style={{ flex: 1, padding: '12px', background: 'transparent', border: '2px solid var(--primary-color)', color: 'var(--primary-color)', fontWeight: 'bold', cursor: 'pointer', borderRadius: '5px', transition: '0.3s' }}
                    >
                        Go Back
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
