import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';

function FriendListPage() {
    const navigate = useNavigate(); 

    // Add friend IDs for routing
    const friends = [
        { id: 1, name: "Sarah" },
        { id: 2, name: "Adam" },
        { id: 3, name: "Isaac" },
        { id: 4, name: "Santa" },
        { id: 5, name: "Happy" }
    ];

    return (
        <div className="container text-center" style={{ position: 'relative' }}>
            {/* Heading */}
            <h2 className="section-header">Friends List</h2>

            {/* Friend Buttons */}
            <div className="mt-md">
                {friends.map((friend) => (
                    <button 
                        key={friend.id} 
                        className="btn btn-primary btn-block" 
                        onClick={() => navigate(`/friend-profile/${friend.id}`)}
                    >
                        {friend.name}
                    </button>
                ))}
            </div>

            {/* Invite Friend Button */}
            <button className="btn btn-primary btn-block" onClick={() => navigate('/invite-friend-page')}>
                Invite Friend
            </button>

            {/* Bottom Navigation Menu */}
            <div className="nav-bar">
                <button className="nav-icon" onClick={() => navigate("/home-page")}>🏠</button>
                <button className="nav-icon active" onClick={() => navigate("/profile-page")}>👤</button>
                <button className="nav-icon" onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

export default FriendListPage;
