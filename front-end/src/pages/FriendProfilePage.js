import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import '../styles/index.css';

function FriendProfilePage() {
    const navigate = useNavigate(); 
    const { friendId } = useParams(); // 👈 Grab friendId from the URL
    const [user, setUser] = useState(null); // 👈 Holds user data from backend
    const [loading, setLoading] = useState(true);

    const handleEditProfile = () => {
        console.log('Edit Profile Clicked');
    };

    useEffect(() => {
        const fetchFriendProfile = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/friends/${friendId}/profile`);
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFriendProfile();
    }, [friendId]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Friend not found.</p>;

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
                <button className="btn btn-primary btn-block">Achievements</button>
                <button className="btn btn-primary btn-block">Completed Quests</button>
                <button className="btn btn-primary btn-block" onClick={() => navigate('/friends-list-page')}>Friends List</button>
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

export default FriendProfilePage;
