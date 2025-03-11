import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', { username, password });
        navigate('/home-page');
    };

    return (
        <div className="container">
            <div className="profile-pic mt-lg mb-md flex justify-center items-center">
                Logo
            </div>
            
            <h2 className="text-center mb-md">Log In</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>

            <div className="text-center mt-md">
                <button 
                    onClick={() => navigate('/create-account')}
                    className="btn btn-block"
                >
                    Create An Account
                </button>
                
                <button 
                    onClick={() => navigate('/reset-password')}
                    className="btn btn-block"
                >
                    Forgot Password?
                </button>
            </div>

            <div className="text-center mt-lg">
                <p className="mb-sm"><a href="#">Privacy Policy</a></p>
                <p>© 2025 QuestNYC Team</p>
            </div>
        </div>
    );
}

export default LoginPage;