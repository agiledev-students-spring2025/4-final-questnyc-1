import React, { useState } from 'react';

function PasswordResetPrompt() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sending reset link to:', email, confirmEmail);
    };

    return (
        <div style={{ margin: '50px' }}>
            <div style={{ width: 150, height: 150, backgroundColor: '#ccc' }}>Logo</div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Current email address</label>
                    <br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Re-enter email address</label>
                    <br />
                    <input
                        type="email"
                        value={confirmEmail}
                        onChange={(e) => setConfirmEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Send Reset Link</button>
            </form>
            <p><a href="#">Privacy Policy</a></p>
            <p>© 2025 QuestNYC Team</p>
        </div>
    );
}

export default PasswordResetPrompt;
