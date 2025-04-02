import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';

function ProfilePage() {
    const navigate = useNavigate(); 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleEditProfile = () => {
        console.log('Edit Profile Clicked');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/profile');
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Profile not found.</p>;

    return (
        <div className="container text-center" style={{ position: 'relative' }}>
            {/* Edit Profile Button */}
            <button 
                onClick={handleEditProfile}
                className="btn btn-primary"
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    padding: 'var(--spacing-xs) var(--spacing-sm)'
                }}
            >
                Edit Profile
            </button>

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
            <div className="nav-bar">
                <button className="nav-icon" onClick={() => navigate("/home-page")}>🏠</button>
                <button className="nav-icon active" onClick={() => navigate("/profile-page")}>👤</button>
                <button className="nav-icon" onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

export default ProfilePage;
