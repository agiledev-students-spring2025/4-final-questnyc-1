// AchievementsPage.js
import { React, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/index.css';
import NavBar from '../components/NavBar.js';
import { useAuth } from '../context/AuthContext.js';

function AchievementsPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user: authUser } = useAuth();
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    
    // Get userId from query params or use current user
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get('userId') || (authUser ? authUser._id : localStorage.getItem('userId'));

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                // Fetch the achievements
                const achievementsRes = await fetch(`/api/achievements/${userId}`);
                const achievementsData = await achievementsRes.json();
                setAchievements(achievementsData);
                
                // If this is a friend's profile, fetch their username
                if (queryParams.get('userId')) {
                    const userRes = await fetch(`/api/auth/users/${userId}/fullprofile`);
                    if (userRes.ok) {
                        const userData = await userRes.json();
                        setUsername(userData.username);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (userId) {
            fetchAchievements();
        } else {
            setLoading(false);
        }
    }, [userId, queryParams]);

    if (loading) return <div className="container text-center">Loading...</div>;

    return (
        <div className="container achievements-container">
            <h1 className="achievements-title">
                {username ? `${username}'s Achievements` : 'Achievements'}
            </h1>
            
            <h2 className="section-header">In Progress</h2>
            <div className="achievements-section">
                {achievements.filter(a => !a.completed).length > 0 ? (
                    achievements.filter(a => !a.completed).map((a, index) => (
                        <div key={index} className="achievement-item">
                            <span className="achievement-name">{a.name}</span>
                            <div>Goal: </div>
                            {a.description && (
                                <p className="achievement-subtext">{a.description}</p>
                            )}
                            <div className="progress-container">
                                <div className="progress-fill" style={{ width: `${(a.progress / a.total) * 100}%` }}></div>
                            </div>
                            <span className="progress-text">{a.progress}/{a.total}</span>
                        </div>
                        
                    ))
                ) : (
                    <p className="text-center">No achievements in progress</p>
                )}
            </div>
            
            <h2 className="section-header">Completed</h2>
            <div className="achievements-section">
                {achievements.filter(a => a.completed).length > 0 ? (
                    achievements.filter(a => a.completed).map((a, index) => (
                        <div key={index} className="achievement-item">
                            <span className="achievement-name">{a.name}</span>
                            <div className="progress-bar-row">
                                <div className="progress-container">
                                    <div className="progress-fill" style={{ width: `${(a.progress / a.total) * 100}%` }}></div>
                                </div>
                                <span className="progress-text">{a.progress}/{a.total}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No completed achievements</p>
                )}
            </div>
            
            {queryParams.get('userId') && (
                <button 
                    className="btn btn-secondary btn-block"
                    onClick={() => navigate(`/friend-profile/${userId}`)}
                >
                    Back to Profile
                </button>
            )}
            
            <NavBar />
        </div>
    );
}

export default AchievementsPage;