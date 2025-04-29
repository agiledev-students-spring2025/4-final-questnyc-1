import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.js';
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

    if (loading) return <div className="container text-center p-md">Loading...</div>;
    if (error) return <div className="container text-center p-md">Error: {error}</div>;

    return (
        <div className="container leaderboard-container">
            <h1 className="leaderboard-title">Leaderboard</h1>

            {leaderboardData.length > 0 && (
                <div className="top-player">
                    <div className="profile-pic">
                        <img src={leaderboardData[0].profilePic || `https://picsum.photos/seed/${encodeURIComponent(leaderboardData[0].username)}/120`} alt="Top Player" />
                    </div>
                    <div className="username-score">
                        <span className="username">{leaderboardData[0].username}</span>
                        <span className="score">{leaderboardData[0].score} EXP</span>
                    </div>
                </div>
            )}

            <ul className="leaderboard-list">
                {/* Only show players 2-6 */}
                {leaderboardData.slice(1, 6).map((player) => (
                    <li key={player.rank} className="leaderboard-item">
                        <div className="rank-section">
                            <div className="rank-circle">{player.rank}</div>
                            <img
                                className="profile-picture-small"
                                src={player.profilePic || `https://picsum.photos/seed/${encodeURIComponent(player.username)}/50`}
                                alt={`Player ${player.rank}`}
                            />
                        </div>
                        <div className="username-box">{player.username}</div>
                        <div className="score-box">{player.score}</div>
                    </li>
                ))}
            </ul>

            <NavBar />
        </div>
    );
}

export default LeaderboardPage;