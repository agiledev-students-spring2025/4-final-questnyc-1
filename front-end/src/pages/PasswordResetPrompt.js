import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
                // Pass the username to the next page
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
        <div style={{ margin: '50px' }}>
            <div style={{ width: 150, height: 150, backgroundColor: '#ccc' }}>Logo</div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Re-enter Username</label>
                    <br />
                    <input
                        type="text"
                        value={confirmUsername}
                        onChange={(e) => setConfirmUsername(e.target.value)}
                    />
                </div>
                <button type="submit">Next</button>
            </form>
            <p><a href="#">Privacy Policy</a></p>
            <p>© 2025 QuestNYC Team</p>
        </div>
    );
}

export default PasswordResetPrompt;
