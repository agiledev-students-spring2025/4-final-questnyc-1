import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext.js';
import NavBar from '../components/NavBar.js';
import '../styles/index.css';

function ProfilePage() {
    const navigate = useNavigate(); 
    const { user: authUser } = useAuth();  // 👈 use logged-in user from context
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/profile?userId=${authUser._id}`); // 👈 fetch real user
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
            <div className="profile-pic">
                <img 
                    src={user.profilePic} 
                    alt="Profile" 
                />
            </div>

            {/* Username */}
            <h2 className="mt-sm">{user.username}</h2>

            {/* First Joined */}
            <p style={{ color: 'var(--text-secondary)' }}>First Joined: {user.firstJoined}</p>

            {/* Action Buttons */}
            <div className="mt-md">
                <button className="btn btn-primary btn-block" onClick={() => navigate('/achievements')}>Achievements</button>
                <button className="btn btn-primary btn-block" onClick={() => navigate('/completed-quests')}>Completed Quests</button>
                <button className="btn btn-primary btn-block" onClick={() => navigate('/friends-list-page')}>Friends List</button> 
                <button className="btn btn-primary btn-block">Change Password</button>
            </div>

            {/* Bottom Navigation Menu */}
            <NavBar />
        </div>
    );
}

export default ProfilePage;
