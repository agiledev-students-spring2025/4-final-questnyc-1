import React, { useState } from 'react';

function CreateAccountPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Creating account:', { username, password, confirmPass });
    };

    return (
        <div style={{ margin: '50px' }}>
            <div style={{ width: 150, height: 150, backgroundColor: '#ccc' }}>Logo</div>
            <h2>Create An Account</h2>
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
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Re-enter Password</label>
                    <br />
                    <input
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                </div>
                <button type="submit">Create Account</button>
            </form>
            <p><a href="#">Privacy Policy</a></p>
            <p>© 2025 QuestNYC Team</p>
        </div>
    );
}

export default CreateAccountPage;
