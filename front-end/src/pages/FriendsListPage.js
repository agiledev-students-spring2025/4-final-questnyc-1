import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function FriendListPage() {
    const navigate = useNavigate(); 

    const friends = ["Sarah", "Adam", "Isaac", "Santa", "Happy"]; 

    return (
        <div style={{ margin: '50px', maxWidth: '400px', textAlign: 'center', position: 'relative' }}>
            {/* Heading */}
            <h2>Friends List</h2>

            {/* Friend Buttons */}
            <div style={{ marginTop: '20px' }}>
                {friends.map((friend, index) => (
                    <button 
                        key={index} 
                        style={buttonStyle} 
                        //onClick={() => navigate(`/friend-profile-page/${friend.toLowerCase()}`)} //new pages
                        onClick={() => navigate(`/friend-profile-page`)}
                    >
                        {friend}
                    </button>
                ))}
            </div>

            {/* Invite Friend Button */}
            <button style={buttonStyle} onClick={() => navigate('/invite-friend-page')}>
                Invite Friend
            </button>

            {/* Bottom Navigation Menu */}
            <div style={navBarStyle}>
                <button style={iconButtonStyle} onClick={() => navigate("/home-page")}>🏠</button>
                <button style={iconButtonStyle} onClick={() => navigate("/profile-page")}>👤</button>
                <button style={iconButtonStyle} onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

/* Button Style */
const buttonStyle = {
    display: 'block',
    width: '80%',
    padding: '10px',
    margin: '10px auto',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
};

/* Bottom Navigation Menu Style */
const navBarStyle = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 0',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #ddd'
};

/* Icon-like Button Style */
const iconButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer'
};

export default FriendListPage;
