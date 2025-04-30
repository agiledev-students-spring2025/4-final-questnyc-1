

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import NavBar from '../components/NavBar.js';
import '../styles/index.css';

function ProfilePage() {
    const navigate = useNavigate();
    const { user: authUser, logout } = useAuth(); // <-- added logout here
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/profile?userId=${authUser._id}`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [authUser]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Profile not found.</p>;

    return (
        <div className="container profile-container text-center" style={{ position: 'relative' }}>
            {/* Profile Picture */}
            <div
    style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: 'white',
        display: 'inline-block',
        margin: '0 auto'
    }}
>
    <img
        src={user.profilePic}
        alt="Profile"
        style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        }}
    />
</div>

            {/* Username and XP */}
            <h2 className="mt-sm">{user.username}</h2>
            <p style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                Total XP: {user.totalXP ?? 0}
            </p>

            {/* First Joined */}
            <p style={{ color: 'var(--text-secondary)' }}>First Joined: {user.firstJoined}</p>

            {/* Action Buttons */}
            <div className="mt-md">
                <button className="btn btn-primary btn-block" onClick={() => navigate('/achievements')}>Achievements</button>
                <button className="btn btn-primary btn-block" onClick={() => navigate('/completed-quests')}>Completed Quests</button>
                <button className="btn btn-primary btn-block" onClick={() => navigate('/friends-list-page')}>Friends List</button>
                <button className="btn btn-primary btn-block" onClick={() => navigate('/reset-password')}>Change Password</button>
                <button
                    className="btn btn-secondary btn-block"
                    style={{ marginTop: '1em', backgroundColor: '#d9534f', borderColor: '#d43f3a' }}
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                >
                    Log Out
                </button>
            </div>

            {/* Bottom Navigation Menu */}
            <NavBar />
        </div>
    );
}

export default ProfilePage;
