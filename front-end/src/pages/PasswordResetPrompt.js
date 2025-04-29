// PasswordResetPrompt.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/questnyclogo.png'; // Import the logo

function PasswordResetPrompt() {
    const [username, setUsername] = useState('');
    const [confirmUsername, setConfirmUsername] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/password-reset-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, confirmUsername })
            });

            const data = await res.json();

            if (res.ok) {
                navigate('/password-reset-confirmation', { state: { username } });
            } else {
                alert(data.message || 'Reset request failed');
            }
        } catch (error) {
            console.error('Reset request error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="password-reset-container">
            <div className="logo-circle mt-lg mb-lg" style={{ marginBottom: "25px" }}>
                <img src={logo} alt="QuestNYC Logo" />
            </div>
            
            <div className="password-reset-form">
                <h2 className="password-reset-title">Reset Password</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" style={{color: 'var(--secondary)', marginBottom: 'var(--spacing-sm)', display: 'block'}}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmUsername" style={{color: 'var(--secondary)', marginBottom: 'var(--spacing-sm)', display: 'block'}}>
                            Re-enter Username
                        </label>
                        <input
                            id="confirmUsername"
                            type="text"
                            value={confirmUsername}
                            onChange={(e) => setConfirmUsername(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary btn-block">
                        Next
                    </button>
                </form>
            </div>
            
            <div className="password-footer">
                <p><a href="#">Privacy Policy</a></p>
                <p>© 2025 QuestNYC Team</p>
            </div>
        </div>
    );
}

export default PasswordResetPrompt;