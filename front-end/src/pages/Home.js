import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

const Home = () => {
  const navigate = useNavigate();

  const [currentQuest, setCurrentQuest] = useState(null);
  const [availableQuests, setAvailableQuests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/home`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentQuest(data.currentQuest);
        setAvailableQuests(data.availableQuests);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching home data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h1 className="section-header text-center">Loading...</h1>;

  if (!currentQuest) {
    return (
      <div className="container">
        <h1 className="section-header text-center">No quest data available.</h1>
        <div className="nav-bar">
          <button className="nav-icon active" onClick={() => navigate("/home-page")}>🏠</button>
          <button className="nav-icon" onClick={() => navigate("/profile-page")}>👤</button>
          <button className="nav-icon" onClick={() => navigate("/leaderboard")}>🏆</button>
        </div>
      </div>
    );    
  }

  return (
    <div className="container">
      {/* Quest In Progress */}
      <h1 className="section-header text-center">Quest In Progress</h1>
      <div className="quest-box">
        <h2 className="quest-name">{currentQuest.name}</h2>
        <p className="quest-checkpoint">
          Next Checkpoint: <span>{currentQuest.nextCheckpoint}</span>
        </p>
        <div className="progress-container">
          <div
            className="progress-fill"
            style={{ width: `${currentQuest.progress}%` }}
          ></div>
        </div>
        <a onClick={() => navigate('/quest-detail')} className="more-info">
          More Information →
        </a>
      </div>

      {/* Available Quests */}
      <h2 className="available-quests-title">Available Quests</h2>
      <hr className="separator" />
      <div className="quests-list">
        {availableQuests.map((quest, index) => (
          <div key={index} className="quest-item">
            <h3 className="quest-name">{quest.name}</h3>
            <p className="route-label">Route</p>
            <p className="quest-route">{quest.route}</p>
            <a onClick={() => navigate('/quest-detail')} className="more-info">
              More Information →
            </a>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Menu */}
      <div className="nav-bar">
        <button className="nav-icon active" onClick={() => navigate("/home-page")}>🏠</button>
        <button className="nav-icon" onClick={() => navigate("/profile-page")}>👤</button>
        <button className="nav-icon" onClick={() => navigate("/leaderboard")}>🏆</button>
      </div>
    </div>
  );
};

export default Home;
