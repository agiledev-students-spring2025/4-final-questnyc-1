import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/index.css';

function QuestDetailPage() {
    const navigate = useNavigate();
    const { questId } = useParams(); // Get the questId from the URL params
    const [quest, setQuest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch quest details from the backend
    useEffect(() => {
        const fetchQuestDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/quests/${questId}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch quest details');
                }
                
                const data = await response.json();
                setQuest(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchQuestDetails();
    }, [questId]);
    
    const acceptQuest = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/quests/${questId}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to accept quest');
            }
            
            // Navigate to home page after successfully accepting the quest
            navigate("/home-page");
            
        } catch (err) {
            setError(err.message);
        }
    };
    
    if (loading) return <div className="container text-center">Loading...</div>;
    if (error) return <div className="container text-center">Error: {error}</div>;
    if (!quest) return <div className="container text-center">Quest not found</div>;
    
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
                {quest.points && quest.points.map((point, index) => (
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
                    onClick={acceptQuest}
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