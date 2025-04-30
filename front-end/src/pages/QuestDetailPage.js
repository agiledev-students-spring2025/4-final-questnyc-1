import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import '../styles/index.css';
import NavBar from '../components/NavBar.js';

function QuestDetailPage() {
    const navigate = useNavigate();
    const { questId } = useParams();
    const { user } = useAuth();
    const [quest, setQuest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchQuestDetails = async () => {
            try {
                const response = await fetch(`/api/quests/${questId}`);
                if (!response.ok) throw new Error('Failed to fetch quest details');
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
        if (!user) {
            navigate('/login');
            return;
        }
        
        try {
            const response = await fetch(`/api/quests/${questId}/accept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: user._id })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to accept quest');
            }
            
            await fetch('/api/achievements/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId: user._id,
                    name: 'Accepted Quests',  // match with your achievement seed
                    increment: 1
                })
            });
            
            navigate("/home-page");
        } catch (err) {
            alert(err.message);
        }
    };
    
    if (loading) return <div className="container text-center">Loading...</div>;
    if (error) return <div className="container text-center">Error: {error}</div>;
    if (!quest) return <div className="container text-center">Quest not found</div>;
    
    const expirationDate = quest.expiresAt 
        ? new Date(quest.expiresAt).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: '2-digit'
          })
        : "No expiration";
    
    // Create a simple static map URL using OpenStreetMap static image service
    const [lng, lat] = quest.startLocation.coordinates;
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`;
    
    return (
        <div className="quest-detail-container">
            {/* Back Arrow with improved styling */}
            <div className="back-button-container">
                <button 
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ←
                </button>
            </div>
            
            <h2 className="section-header text-center">[{quest.name}] Details</h2>
            <hr className="separator" />
            
            {/* Static Map Container */}
            <div className="card mb-md" style={{ 
                height: '250px', 
                overflow: 'hidden',
                width: '100%',
                maxWidth: '100%',
                borderRadius: 'var(--radius-md)'
                // Removed the border: '2px solid var(--secondary)'
            }}>
                <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={mapUrl}
                    style={{ 
                        border: 0,
                        display: 'block'
                    }}
                    title="Quest Map"
                    allowFullScreen
                />
            </div>
            
            <div className="mb-md text-center" style={{ margin: '0 auto', maxWidth: '600px' }}>
            <p className="mb-sm">{quest.description}</p>
            </div>
            
            <div className="mb-md text-center" style={{ margin: '0 auto', maxWidth: '600px' }}>
            <h3>Checkpoints:</h3>
            {quest.checkpoints && quest.checkpoints.map((checkpoint, index) => (
                <div key={index} className="mb-sm">
                <p><strong>{index + 1}. {checkpoint.name}</strong></p>
                <p>{checkpoint.description}</p>
                </div>
            ))}
            </div>
            
            <div className="text-center mb-md" style={{ margin: '0 auto', maxWidth: '600px' }}>
                <p className="mb-xs">Theme: {quest.theme}</p>
                <p className="mb-xs">Difficulty: {quest.difficulty}</p>
                <p className="mb-xs">Estimated Time: {quest.estimatedTime} minutes</p>
                <p className="mb-xs">Distance: {quest.distance} km</p>
                <p className="mb-xs">Quest Expiration</p>
                <p className="mb-xs" style={{ fontWeight: 'var(--weight-bold)' }}>{expirationDate}</p>
                <p className="mb-xs">Reward: {quest.rewardXP} XP</p>
                {quest.rewardItems && quest.rewardItems.length > 0 && (
                    <p className="mb-xs">Items: {quest.rewardItems.join(', ')}</p>
                )}
            </div>
            
            <div className="text-center" style={{ margin: '40px' }}>
                <button 
                    className="btn btn-primary"
                    style={{ width: '150px' }}
                    onClick={acceptQuest}
                >
                    Accept Quest
                </button>
            </div>
            
            <NavBar />
        </div>
    );
}

export default QuestDetailPage;