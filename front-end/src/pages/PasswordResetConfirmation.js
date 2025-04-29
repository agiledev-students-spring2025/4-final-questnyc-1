import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PasswordResetConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || {};
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    useEffect(() => {
        console.log("username passed: " + username);
        if (!username) {
            // If accessed directly, send back to prompt
            navigate('/password-reset-prompt');
        }
    }, [username, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5000/api/password-reset-confirmation', {
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
        <div style={{ margin: '50px' }}>
            <div style={{ width: 150, height: 150, backgroundColor: '#ccc' }}>Logo</div>
            <h2>Reset Password for “{username}”</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password</label>
                    <br />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Re-enter New Password</label>
                    <br />
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Reset Password</button>
            </form>
            <p><a href="#">Privacy Policy</a></p>
            <p>© 2025 QuestNYC Team</p>
        </div>
    );
}

export default PasswordResetConfirmation;
