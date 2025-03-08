import React, { useState } from 'react';

function PasswordResetConfirmation() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle final reset
        console.log('Resetting password to:', newPassword, confirmNewPassword);
    };

    return (
        <div style={{ margin: '50px' }}>
            <div style={{ width: 150, height: 150, backgroundColor: '#ccc' }}>
                Logo
            </div>
            <h2>Enter New Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password</label><br />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    /><br /><br />
                </div>
                <div>
                    <label>Re-enter New Password</label><br />
                    <input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    /><br /><br />
                </div>
                <button type="submit">Reset Password</button>
            </form>

            <p><a href="#">Privacy Policy</a></p>
            <p>© 2025 QuestNYC Team</p>
        </div>
    );
}

export default PasswordResetConfirmation;
