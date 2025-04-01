import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

function CompletedQuestsPage() {
    const navigate = useNavigate();
    
    // Sample completed quests data
    const completedQuests = [
        {
            id: 1,
            title: "Quest #1",
            information: "[Quest Information]",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            progress: "5/5",
            progressPercent: 100
        },
        {
            id: 2,
            title: "Quest #2",
            information: "[Quest Information]",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            progress: "3/3",
            progressPercent: 100
        },
        {
            id: 3,
            title: "Quest #3",
            information: "[Quest Information]",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            progress: "7/7",
            progressPercent: 100
        }
    ];
    
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