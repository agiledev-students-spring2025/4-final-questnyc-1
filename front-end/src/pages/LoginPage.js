import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import '../styles/index.css';
import logo from '../assets/questnyclogo.png';

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok) {
                login(data.user);
                localStorage.setItem('userId', data.user._id);
                navigate('/home-page');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-logo">
                <img 
                    src={logo} 
                    alt="QuestNYC Logo" 
                />
            </div>

            <h2 className="text-center mb-md">Log In</h2>

            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-input-container">
                    <label className="login-label">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-input-container">
                    <label className="login-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>

            <div className="text-center mt-md">
                <button onClick={() => navigate('/create-account')} className="btn btn-block">
                    Create An Account
                </button>
                <button onClick={() => navigate('/reset-password')} className="btn btn-block">
                    Forgot Password?
                </button>
            </div>

            <div className="login-footer">
                <p className="mb-sm"><a href="#">Privacy Policy</a></p>
                <p>© 2025 QuestNYC Team</p>
            </div>
        </div>
    );
}

export default LoginPage;