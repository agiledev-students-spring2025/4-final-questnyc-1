import { React, useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

function AchievementsPage() {
    const navigate = useNavigate();
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            const userId = localStorage.getItem('userId'); // assuming you store this
            const res = await fetch(`http://localhost:5000/api/achievements/${userId}`);
            const data = await res.json();
            console.log("api resp: ", data);
            setAchievements(data);
        };
        fetchAchievements();
    }, []);


    return (
        <div className="container achievements-container">
            <h1 className="achievements-title">Achievements</h1>
            
            <h2 className="section-header">In Progress</h2>
            <div className="achievements-section">
                {achievements.filter(a => !a.completed).map((a, index) => (
                    <div key={index} className="achievement-item">
                        <span className="achievement-name">{a.name}</span>
                        <div className="progress-container">
                            <div className="progress-fill" style={{ width: `${(a.progress / a.total) * 100}%` }}></div>
                        </div>
                        <span className="progress-text">{a.progress}/{a.total}</span>
                    </div>
                ))}
            </div>
            
            <h2 className="section-header">Completed</h2>
            <div className="achievements-section">
                {achievements.filter(a => a.completed).map((a, index) => (
                    <div key={index} className="achievement-item">
                        <span className="achievement-name">{a.name}</span>
                        <div className="progress-container">
                            <div className="progress-fill completed" style={{ width: '100%' }}></div>
                        </div>
                        <span className="progress-text">{a.progress}/{a.total}</span>
                    </div>
                ))}
            </div>
            
            <div className="nav-bar">
                <button className="nav-icon" onClick={() => navigate("/home-page")}>🏠</button>
                <button className="nav-icon" onClick={() => navigate("/profile-page")}>👤</button>
                <button className="nav-icon active" onClick={() => navigate("/leaderboard")}>🏆</button>
            </div>
        </div>
    );
}

export default AchievementsPage;