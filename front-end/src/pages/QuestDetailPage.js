import React from 'react';
import { useNavigate } from 'react-router-dom';

function QuestDetailPage() {
    const navigate = useNavigate();
    
    // Sample quest data - this would typically come from props or context
    const quest = {
        name: "Brooklyn Bridge Walk",
        points: [
            "Point 1: City Hall",
            "Point 2: Brooklyn Bridge Walkway",
            "Point 3: DUMBO"
        ],
        expiration: "12:00 MM/DD/YY",
        reward: "500 XP"
    };
    
    return (
        <div style={{ margin: '20px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            {/* Quest Title */}
            <h2 style={{ textAlign: 'center', margin: '0' }}>[{quest.name}] Details</h2>
            <hr style={{ marginTop: '8px', marginBottom: '20px' }} />
            
            {/* Map Container */}
            <div style={{ 
                backgroundColor: '#ddd', 
                height: '250px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px',
                marginBottom: '20px'
            }}>
                Quest Map With Location Pins
            </div>
            
            {/* Quest Points */}
            <div style={{ marginBottom: '20px' }}>
                {quest.points.map((point, index) => (
                    <p key={index} style={{ margin: '10px 0' }}>{point}</p>
                ))}
            </div>
            
            {/* Quest Details */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <p style={{ margin: '5px 0' }}>Quest Expiration</p>
                <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{quest.expiration}</p>
                <p style={{ margin: '5px 0' }}>Reward: {quest.reward}</p>
            </div>
            
            {/* Accept Button */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <button 
                style={{
                    backgroundColor: '#ccc',
                    border: 'none',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    width: '150px'
                }}
                onClick={() => {
                    console.log('Quest accepted');
                    navigate("/home-page"); // Navigate back to the home page
                }}
            >
                Accept Quest
            </button>
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

export default QuestDetailPage;