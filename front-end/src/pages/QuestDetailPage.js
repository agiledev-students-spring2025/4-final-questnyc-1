import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

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
        <div className="container">
            {/* Quest Title */}
            <h2 className="section-header text-center">[{quest.name}] Details</h2>
            <hr className="separator" />
            
            {/* Map Container */}
            <div className="card mb-md" style={{ 
                height: '250px', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ddd'
            }}>
                Quest Map With Location Pins
            </div>
            
            {/* Quest Points */}
            <div className="mb-md">
                {quest.points.map((point, index) => (
                    <p key={index} className="mb-sm">{point}</p>
                ))}
            </div>
            
            {/* Quest Details */}
            <div className="text-center mb-md">
                <p className="mb-xs">Quest Expiration</p>
                <p className="mb-xs" style={{ fontWeight: 'var(--weight-bold)' }}>{quest.expiration}</p>
                <p className="mb-xs">Reward: {quest.reward}</p>
            </div>
            
            {/* Accept Button */}
            <div className="text-center mb-lg">
                <button 
                    className="btn btn-primary"
                    style={{ width: '150px' }}
                    onClick={() => {
                        console.log('Quest accepted');
                        navigate("/home-page");
                    }}
                >
                    Accept Quest
                </button>
            </div>
            
            {/* Bottom Navigation Menu */}
            <div className="nav-bar">
                <button className="nav-icon active" onClick={() => navigate("/home-page")}>🏠</button>
                <button className="nav-icon" onClick={() => navigate("/profile-page")}>👤</button>
                <button className="nav-icon" onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

export default QuestDetailPage;