import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import '../styles/index.css';
import NavBar from '../components/NavBar.js';

function CompletedQuestsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const userId = user?._id;

    const [completedQuests, setCompletedQuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!userId) return;

        const fetchCompletedQuests = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${userId}/quests/completed`);
                if (!response.ok) {
                    throw new Error('Failed to fetch completed quests');
                }
                const data = await response.json();
                setCompletedQuests(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompletedQuests();
    }, [userId]);

    if (loading) return <div className="container text-center">Loading...</div>;
    if (error) return <div className="container text-center">Error: {error}</div>;

    return (
        <div className="container">
            <h1 className="section-header text-center">Completed Quests</h1>
            <hr className="separator" />

            <div className="mb-lg">
                {completedQuests.map((quest) => (
                    <div key={quest._id} className="quest-item mb-md">
                        <h2 className="quest-name mb-xs">{quest.questId?.name || 'Unnamed Quest'}</h2>
                        <div className="text-center">
                            <p className="mb-xs" style={{ fontWeight: 'var(--weight-bold)' }}>
                                {quest.questId?.description || '[No Description]'}
                            </p>
                            <p className="mb-sm" style={{ fontSize: 'var(--font-sm)' }}>
                                Completed: {new Date(quest.completedAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center">
                            <div className="progress-container">
                                <div
                                    className="progress-fill completed"
                                    style={{ width: `100%` }}
                                ></div>
                            </div>
                            <span style={{ marginLeft: 'var(--spacing-sm)', fontWeight: 'var(--weight-bold)' }}>
                                Completed
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <NavBar />
        </div>
    );
}

export default CompletedQuestsPage;
