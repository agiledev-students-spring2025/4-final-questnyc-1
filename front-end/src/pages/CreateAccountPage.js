import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';
import logo from '../assets/questnyclogo.png'; // ✅ Import the logo

function CreateAccountPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [selectedProfilePic, setSelectedProfilePic] = useState('https://picsum.photos/seed/selfie/100'); // Default pic
    const navigate = useNavigate();

    const profilePicOptions = [
        'https://picsum.photos/seed/profilepic1/100',
        'https://picsum.photos/seed/profilepic2/100',
        'https://picsum.photos/seed/profilepic3/100',
        'https://picsum.photos/seed/profilepic4/100',
        'https://picsum.photos/seed/profilepic5/100',
        'https://picsum.photos/seed/profilepic6/100',
        'https://picsum.photos/seed/profilepic7/100',
        'https://picsum.photos/seed/profilepic8/100',
        'https://picsum.photos/seed/profilepic9/100',
        'https://picsum.photos/seed/profilepic10/100',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userEmail = email || `${username}@example.com`;

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username, 
                    email: userEmail,
                    password, 
                    confirmPass,
                    profilePic: selectedProfilePic // 👈 include selected profile picture URL
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPass('');
                setSelectedProfilePic('https://picsum.photos/seed/selfie/100');
                navigate('/login');
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
            {/* Logo at the top */}
            <div className="profile-pic mt-lg mb-md flex justify-center items-center" style={{ width: 200, height: 200, margin: '0 auto' }}>
                <img 
                    src={logo} 
                    alt="QuestNYC Logo" 
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
            </div>

            <h2 className="text-center mb-md">Create An Account</h2>

            {/* Profile Picture Selection (scrolling horizontally) */}
            <div className="text-center mb-md">
                <h4>Choose a Profile Picture:</h4>
                <div 
                    style={{ 
                        display: 'flex', 
                        overflowX: 'auto', 
                        padding: '10px 0', 
                        gap: '20px', 
                        marginTop: '10px',
                        scrollbarWidth: 'none', // Firefox
                        msOverflowStyle: 'none' // IE
                    }}
                >
                    {profilePicOptions.map((pic, index) => (
                        <img
                            key={index}
                            src={pic}
                            alt={`Profile Option ${index + 1}`}
                            onClick={() => setSelectedProfilePic(pic)}
                            style={{
                                flex: '0 0 auto',
                                width: '80px',
                                height: '80px',
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: selectedProfilePic === pic ? '3px solid #007bff' : '2px solid gray',
                                cursor: 'pointer'
                            }}
                        />
                    ))}
                </div>
            </div>

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
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
