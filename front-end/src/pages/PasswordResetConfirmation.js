// PasswordResetConfirmation.js 
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/questnyclogo.png'; // Import the logo

function PasswordResetConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || {};
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        if (!username) {
            navigate('/password-reset-prompt');
        }
    }, [username, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/password-reset-confirmation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, newPassword, confirmNewPassword })
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                navigate('/login');
            } else {
                alert(data.message || 'Password reset failed');
            }
        } catch (error) {
            console.error('Password reset error:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="password-reset-container">
            <div className="logo-circle mt-lg mb-lg" style={{ marginBottom: "25px" }}>
                <img src={logo} alt="QuestNYC Logo" />
            </div>
            
            <div className="password-reset-form">
                <h2 className="password-reset-title">Reset Password for "{username}"</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="newPassword" style={{color: 'var(--secondary)', marginBottom: 'var(--spacing-sm)', display: 'block'}}>
                            New Password
                        </label>
                        <input
                            id="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmNewPassword" style={{color: 'var(--secondary)', marginBottom: 'var(--spacing-sm)', display: 'block'}}>
                            Re-enter New Password
                        </label>
                        <input
                            id="confirmNewPassword"
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary btn-block">
                        Reset Password
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

export default PasswordResetConfirmation;