import React, { useState } from 'react';
import '../styles/index.css';

function CreateAccountPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle create account logic
        console.log('Creating account:', { username, password, confirmPass });
    };

    return (
        <div className="container">
            <div className="profile-pic mt-lg mb-md flex justify-center items-center">
                Logo
            </div>
            
            <h2 className="text-center mb-md">Create An Account</h2>
            
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
                <div>
                    <label>Re-enter Password</label>
                    <input
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Account</button>
            </form>

            <div className="text-center mt-lg">
                <p className="mb-sm"><a href="#">Privacy Policy</a></p>
                <p>© 2025 QuestNYC Team</p>
            </div>
        </div>
    );
}

export default CreateAccountPage;