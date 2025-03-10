import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AchievementsPage.css';

function AchievementsPage() {
    const navigate = useNavigate();

    const achievements = [ // placeholder achievements
        { name: 'Achievement #1', progress: 2, total: 3, completed: false },
        { name: 'Achievement #2', progress: 1, total: 4, completed: false },
        { name: 'Achievement #3', progress: 0, total: 7, completed: false },
        { name: 'Achievement #4', progress: 5, total: 5, completed: true },
        { name: 'Achievement #5', progress: 2, total: 2, completed: true },
    ];


    return (
        <div className="achievements-container">
            <h1 className="achievements-title">Achievements</h1>
            <h2 className="section-title">In Progress</h2>
            <div className="achievements-section">
                {achievements.filter(a => !a.completed).map((a, index) => (
                    <div key={index} className="achievement-item">
                        <span className="achievement-name">{a.name}</span>
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${(a.progress / a.total) * 100}%` }}></div>
                        </div>
                        <span className="progress-text">{a.progress}/{a.total}</span>
                    </div>
                ))}
            </div>
            <h2 className="section-title">Completed</h2>
            <div className="achievements-section">
                {achievements.filter(a => a.completed).map((a, index) => (
                    <div key={index} className="achievement-item">
                        <span className="achievement-name">{a.name}</span>
                        <div className="progress-bar completed">
                            <div className="progress" style={{ width: '100%' }}></div>
                        </div>
                        <span className="progress-text">{a.progress}/{a.total}</span>
                    </div>
                ))}
            </div>
            <div style={navBarStyle}>
                <button style={iconButtonStyle} onClick={() => navigate("/home-page")}>🏠</button>
                <button style={iconButtonStyle} onClick={() => navigate("/profile-page")}>👤</button>
                <button style={iconButtonStyle} onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

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

    export default AchievementsPage;


