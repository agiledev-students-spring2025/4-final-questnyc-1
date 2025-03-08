import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Logging in with:', { username, password });
        // On success, maybe navigate somewhere
    };

    return (
        <div style={{ margin: '50px' }}>
            <div style={{ width: 150, height: 150, backgroundColor: '#ccc' }}>
                Logo
            </div>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label><br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    /><br /><br />
                </div>
                <div>
                    <label>Password</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    /><br /><br />
                </div>
                <button type="submit">Login</button>
            </form>

            <p>
                <button onClick={() => navigate('/create-account')}>Create An Account</button>
            </p>
            <p>
                <button onClick={() => navigate('/reset-password')}>Forgot Password?</button>
            </p>

            <p><a href="#">Privacy Policy</a></p>
            <p>© 2025 QuestNYC Team</p>
        </div>
    );
}

export default LoginPage;
