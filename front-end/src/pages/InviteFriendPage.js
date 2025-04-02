import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/index.css';

function InviteFriendPage() {
    const navigate = useNavigate(); 
    const [phoneNumber, setPhoneNumber] = useState('xxx-xxx-xxxx'); //default number

    const handleInvite = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/invite-friend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber })
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert(data.message); // e.g. "Invitation sent to 123-456-7890"
            } else {
                alert(data.message || 'Failed to send invite.');
            }
        } catch (error) {
            console.error('Invite error:', error);
            alert('Something went wrong. Please try again.');
        }
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