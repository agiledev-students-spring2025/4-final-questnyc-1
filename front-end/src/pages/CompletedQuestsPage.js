import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

function CompletedQuestsPage() {
    const navigate = useNavigate();
    const [completedQuests, setCompletedQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch completed quests from the backend
    useEffect(() => {
        const fetchCompletedQuests = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/completed-quests');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch completed quests');
                }
                
                const data = await response.json();
                setCompletedQuests(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchCompletedQuests();
    }, []);
    
    if (loading) return <div className="container text-center">Loading...</div>;
    if (error) return <div className="container text-center">Error: {error}</div>;
    
    return (
        <div className="container">
            {/* Page Title */}
            <h1 className="section-header text-center">Completed Quests</h1>
            <hr className="separator" />
            
            {/* Completed Quests List */}
            <div className="mb-lg">
                {completedQuests.map((quest) => (
                    <div key={quest.id} className="quest-item mb-md">
                        <h2 className="quest-name mb-xs">{quest.title}</h2>
                        <div className="text-center">
                            <p className="mb-xs" style={{ fontWeight: 'var(--weight-bold)' }}>{quest.information}</p>
                            <p className="mb-sm" style={{ fontSize: 'var(--font-sm)' }}>{quest.description}</p>
                        </div>
                        <div className="flex items-center">
                            <div className="progress-container">
                                <div 
                                    className="progress-fill completed"
                                    style={{ width: `${quest.progressPercent}%` }}
                                ></div>
                            </div>
                            <span style={{ marginLeft: 'var(--spacing-sm)', fontWeight: 'var(--weight-bold)' }}>{quest.progress}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Bottom Navigation Menu */}
            <div className="nav-bar">
                <button className="nav-icon" onClick={() => navigate("/home-page")}>🏠</button>
                <button className="nav-icon active" onClick={() => navigate("/profile-page")}>👤</button>
                <button className="nav-icon" onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

export default CompletedQuestsPage;