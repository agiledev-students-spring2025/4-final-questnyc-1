import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

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
        <div className="container text-center">
            <h1 className="section-header">Leaderboard</h1>

            <div className="top-player">
                <div className="profile-pic">
                    <img
                        // temporary profile picture for #1
                        src={`https://picsum.photos/seed/${leaderboardData[0].username}/50`}
                        alt="#1 Profile Picture"
                    />
                </div>
                <div className="username-score">
                    <span className="username">{leaderboardData[0].username}</span>
                    <div></div>
                    <span className="score">{leaderboardData[0].score}</span>
                    <span>{" EXP"}</span>
                </div>
            </div>

            <ul className="leaderboard-list">
                {leaderboardData.slice(1).map((player) => (
                    <li key={player.rank} className="leaderboard-item">
                        <div className="rank-section">
                            {/* temporary profile pictures for positions 2-9 */}
                            <img className="profile-picture-small"
                                src={`https://picsum.photos/seed/${player.username}/50`}
                                alt="#1 Profile Picture"
                            />
                            <div className="rank-circle">{player.rank}</div>
                        </div>
                        <div className="username-box">{player.username}</div>
                        <div className="score-box">{player.score}</div>
                    </li>
                ))}
            </ul>

            <div className="nav-bar">
                <button className="nav-icon" onClick={() => navigate("/home-page")}>🏠</button>
                <button className="nav-icon" onClick={() => navigate("/profile-page")}>👤</button>
                <button className="nav-icon active" onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

export default LeaderboardPage;