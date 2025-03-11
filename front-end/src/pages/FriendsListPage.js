import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';

function FriendListPage() {
    const navigate = useNavigate(); 

    const friends = ["Sarah", "Adam", "Isaac", "Santa", "Happy"]; 

    return (
        <div className="container text-center" style={{ position: 'relative' }}>
            {/* Heading */}
            <h2 className="section-header">Friends List</h2>

            {/* Friend Buttons */}
            <div className="mt-md">
                {friends.map((friend, index) => (
                    <button 
                        key={index} 
                        className="btn btn-primary btn-block" 
                        onClick={() => navigate(`/friend-profile-page`)}
                    >
                        {friend}
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