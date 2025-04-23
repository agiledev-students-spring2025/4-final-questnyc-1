import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import '../styles/index.css';

function FriendProfilePage() {
    const navigate = useNavigate(); 
    const { friendId } = useParams(); 
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);

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
        <div className="container text-center">
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
