import React from 'react';
import { useNavigate } from 'react-router-dom'; 

function ProfilePage() {
    const navigate = useNavigate(); 

    const user = {
        profilePic: 'https://via.placeholder.com/150', //replace with actual image URL
        username: 'John Smith',
        firstJoined: 'January 2024'
    };

    const handleEditProfile = () => {
        console.log('Edit Profile Clicked');
    };

    return (
        <div style={{ margin: '50px', position: 'relative', maxWidth: '400px', textAlign: 'center' }}>
            {/* Edit Profile Button */}
            <button 
                onClick={handleEditProfile}
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    right: 0, 
                    padding: '5px 10px', 
                    backgroundColor: '#007bff', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer' 
                }}
            >
                Edit Profile
            </button>

            {/* Profile Picture */}
            <div style={{ 
                width: 120, 
                height: 120, 
                borderRadius: '50%', 
                backgroundColor: '#ccc', 
                overflow: 'hidden', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                margin: '0 auto' 
            }}>
                <img 
                    src={user.profilePic} 
                    alt="Profile" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
            </div>

            {/* Username */}
            <h2 style={{ marginTop: '10px' }}>{user.username}</h2>

            {/* First Joined */}
            <p style={{ color: 'gray' }}>First Joined: {user.firstJoined}</p>

            {/* Action Buttons */}
            <div style={{ marginTop: '20px' }}>
                <button style={buttonStyle} onClick={() => navigate('/achievements')}>Achievements</button> {/* navigate to achievements page */}
                <button style={buttonStyle}>Completed Quests</button>
                <button style={buttonStyle} onClick={() => navigate('/friends-list-page')}>Friends List</button> 
                <button style={buttonStyle}>Change Password</button>
            </div>

            {/* Bottom Navigation Menu */}
            <div style={navBarStyle}>
                <button style={iconButtonStyle} onClick={() => navigate("/home-page")}>🏠</button>
                <button style={iconButtonStyle} onClick={() => navigate("/profile-page")}>👤</button>
                <button style={iconButtonStyle} onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

/* Styles */
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

const iconButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',  // Makes them icon-like
    cursor: 'pointer'
};

export default ProfilePage;
