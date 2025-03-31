import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

function CreateAccountPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const navigate = useNavigate(); // 👈 Add this to enable navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, confirmPass })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setUsername('');
                setPassword('');
                setConfirmPass('');
                navigate('/login'); // 👈 Redirect to login page
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again.');
        }
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
