import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LeaderboardPage.css';

function LeaderboardPage() {
    const navigate = useNavigate();

    const leaderboardData = [
        { rank: 1, username: 'Player1', score: 5000 },
        { rank: 2, username: 'Player2', score: 4500 },
        { rank: 3, username: 'Player3', score: 4200 },
        { rank: 4, username: 'Player4', score: 4000 },
        { rank: 5, username: 'Player5', score: 3800 },
        { rank: 6, username: 'Player6', score: 3500 },
        { rank: 7, username: 'Player7', score: 3200 },
        { rank: 8, username: 'Player8', score: 3000 },
        { rank: 9, username: 'Player9', score: 2800 },
    ];

    return (
        <div className="leaderboard-container">
            <h1 className="leaderboard-title">Leaderboard</h1>
            <div className="top-player">
                <div className="profile-picture">#1 Profile Picture</div>
                <div className="username-score">
                    <span className="username">{leaderboardData[0].username}</span>
                    <div></div>
                    <span className="score">{leaderboardData[0].score}</span>
                    <span>{" EXP"}</span>
                </div>
            </div>
            <ul className="leaderboard-list"> 
                {/* create a list containing EXP, profile picture, and name of every player in the top 10 */}
                {leaderboardData.slice(1).map((player) => (
                    <li key={player.rank} className="leaderboard-item">
                        <div className="rank-section">
                            <div className="profile-picture-small"></div>
                            <div className="rank-circle">{player.rank}</div>
                        </div>
                        <div className="username-box">{player.username}</div>
                        <div className="score-box">{player.score}</div>
                    </li>
                ))}
            </ul>
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

export default LeaderboardPage;
