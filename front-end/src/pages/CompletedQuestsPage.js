import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import '../styles/index.css';
import NavBar from '../components/NavBar.js';

function CompletedQuestsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user: authUser } = useAuth();

    // Get userId from query params or use current user
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId') || (authUser ? authUser._id : localStorage.getItem('userId'));

    const [completedQuests, setCompletedQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch completed quests
                const questsResponse = await fetch(`/api/user/${userId}/quests/completed`);
                if (!questsResponse.ok) {
                    throw new Error('Failed to fetch completed quests');
                }
                const questsData = await questsResponse.json();
                setCompletedQuests(questsData);

                // If this is a friend's profile, fetch their username
                if (queryParams.get('userId')) {
                    const userRes = await fetch(`/api/auth/users/${userId}/fullprofile`);
                    if (userRes.ok) {
                        const userData = await userRes.json();
                        setUsername(userData.username);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId, queryParams]);

    if (loading) return <div className="completed-quests-container text-center">Loading...</div>;
    if (error) return <div className="completed-quests-container text-center">Error: {error}</div>;

    return (
        <div className="completed-quests-container">
            <h1 className="completed-quests-title">
                {username ? `${username}'s Completed Quests` : 'Completed Quests'}
            </h1>

            <div className="completed-quests-section">
                {completedQuests.length > 0 ? (
                    completedQuests.map((quest) => (
                        <div key={quest._id} className="completed-quest-item">
                            <h2 className="quest-name mb-xs">{quest.questId?.name || 'Unnamed Quest'}</h2>
                            <div className="text-center">
                                <p className="mb-xs" style={{ fontWeight: 'var(--weight-bold)' }}>
                                    {quest.questId?.description || '[No Description]'}
                                </p>
                                <p className="mb-sm" style={{ fontSize: 'var(--font-sm)' }}>
                                    Completed: {new Date(quest.completedAt).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="progress-bar-row">
                                <div className="progress-container">
                                    <div
                                        className="progress-fill completed"
                                        style={{ width: `100%` }}
                                    ></div>
                                </div>
                                <span className="progress-text">
                                    Completed
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No completed quests yet</p>
                )}
            </div>

            {queryParams.get('userId') && (
                <button
                    className="btn btn-primary btn-block"
                    onClick={() => navigate(`/friend-profile/${userId}`)}
                >
                    Back to Profile
                </button>
            )}

            <NavBar />
        </div>
    );
}

export default CompletedQuestsPage;