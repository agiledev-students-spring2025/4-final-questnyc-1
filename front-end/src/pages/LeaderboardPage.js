import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

function LeaderboardPage() {
    const navigate = useNavigate();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/leaderboard');
                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard');
                }
                const data = await response.json();
                setLeaderboardData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    if (loading) return <div className="container text-center">Loading...</div>;
    if (error) return <div className="container text-center">Error: {error}</div>;

    return (
        <div className="container text-center">
            <h1 className="section-header">Leaderboard</h1>

            {leaderboardData.length > 0 && (
                <div className="top-player">
                    <div className="profile-pic">
                        <img
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
            )}

            <ul className="leaderboard-list">
                {leaderboardData.slice(1).map((player) => (
                    <li key={player.rank} className="leaderboard-item">
                        <div className="rank-section">
                            <img
                                className="profile-picture-small"
                                src={`https://picsum.photos/seed/${player.username}/50`}
                                alt={`#${player.rank} Profile Picture`}
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
