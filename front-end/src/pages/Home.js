import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

const Home = () => {
  const navigate = useNavigate();

  // some placeholder data
  const currentQuest = {
    name: "Explore Central Park",
    nextCheckpoint: "Bethesda Fountain",
    progress: 40, // In percentage
  };

  const availableQuests = [
    { name: "Brooklyn Bridge Walk", route: "City Hall → Brooklyn Bridge → DUMBO" },
    { name: "Grand Concourse Tour", route: "Bronx Courthouse → Bronx Museum of Arts → Andrew Freedman Home" },
  ];

  return (
    <div className="container"> 
      {/* Quest In Progress */}
      <h1 className="section-header text-center">Quest In Progress</h1>
      <div className="quest-box">
        <h2 className="quest-name">{currentQuest.name}</h2>
        <p className="quest-checkpoint">Next Checkpoint: <span>{currentQuest.nextCheckpoint}</span></p>
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${currentQuest.progress}%` }}></div>
        </div>
        <a onClick={() => navigate('/quest-detail')} className="more-info">More Information →</a>
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
            <a onClick={() => navigate('/quest-detail')} className="more-info">More Information →</a>
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
}

export default Home;