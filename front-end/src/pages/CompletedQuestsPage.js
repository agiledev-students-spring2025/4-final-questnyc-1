import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div style={{ margin: '20px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
            {/* Page Title */}
            <h1 style={{ textAlign: 'center', margin: '0', fontSize: '28px' }}>Completed Quests</h1>
            <hr style={{ marginTop: '8px', marginBottom: '20px' }} />
            
            {/* Completed Quests List */}
            <div style={{ marginBottom: '80px' }}>
                {completedQuests.map((quest) => (
                    <div key={quest.id} style={questCardStyle}>
                        <h2 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>{quest.title}</h2>
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{quest.information}</p>
                            <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{quest.description}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={progressBarContainerStyle}>
                                <div 
                                    style={{
                                        ...progressBarStyle,
                                        width: `${quest.progressPercent}%`
                                    }}
                                ></div>
                            </div>
                            <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{quest.progress}</span>
                        </div>
                    </div>
                ))}
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

/* Styles */
const questCardStyle = {
    backgroundColor: '#ddd',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '20px'
};

const progressBarContainerStyle = {
    flex: 1,
    backgroundColor: '#fff',
    height: '15px',
    borderRadius: '10px',
    overflow: 'hidden'
};

const progressBarStyle = {
    backgroundColor: '#4CAF50',
    height: '100%',
    borderRadius: '10px'
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

export default CompletedQuestsPage;