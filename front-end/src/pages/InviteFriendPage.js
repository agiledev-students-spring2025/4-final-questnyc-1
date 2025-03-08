import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function InviteFriendPage() {
    const navigate = useNavigate(); 
    const [phoneNumber, setPhoneNumber] = useState('xxx-xxx-xxxx'); //default number

    const handleInvite = () => {
        console.log(`Inviting friend with phone number: ${phoneNumber}`);
        //add logic to send an invite
    };

    return (
        <div style={{ margin: '50px', textAlign: 'center', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            {/* Heading */}
            <h2>Invite Your Friend!</h2>

            {/* Phone Number Input */}
            <input 
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={inputStyle}
            />

            {/* Invite Button */}
            <button onClick={handleInvite} style={buttonStyle}>
                Invite
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

/* Styles */
const inputStyle = {
    display: 'block',
    width: '80%',
    padding: '10px',
    margin: '10px auto',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    textAlign: 'center'
};

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
    fontSize: '24px',
    cursor: 'pointer'
};

export default InviteFriendPage;
