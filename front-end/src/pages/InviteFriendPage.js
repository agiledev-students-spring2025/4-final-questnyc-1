import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';

function InviteFriendPage() {
    const navigate = useNavigate(); 
    const [phoneNumber, setPhoneNumber] = useState('xxx-xxx-xxxx'); //default number

    const handleInvite = () => {
        console.log(`Inviting friend with phone number: ${phoneNumber}`);
        //add logic to send an invite
    };

    return (
        <div className="container text-center">
            {/* Heading */}
            <h2 className="section-header">Invite Your Friend!</h2>

            {/* Phone Number Input */}
            <input 
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="text-center"
            />

            {/* Invite Button */}
            <button onClick={handleInvite} className="btn btn-primary btn-block">
                Invite
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

export default InviteFriendPage;