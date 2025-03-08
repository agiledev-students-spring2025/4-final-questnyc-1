import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

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
    <div className="home-container"> 
      {/* Quest In Progress */}
      <h1 className="home-title">Quest In Progress</h1>
      <div className="quest-box">
        <h2 className="quest-name">{currentQuest.name}</h2>
        <p className="quest-checkpoint">Next Checkpoint: <span>{currentQuest.nextCheckpoint}</span></p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${currentQuest.progress}%` }}></div>
        </div>
        <a href="#" className="more-info">More Information →</a>
      </div>
      
      {/* Available Quests */}
      <h2 className="available-quests-title">Available Quests</h2>
      <hr className="separator" />
      <div className="quests-list">
        {availableQuests.map((quest, index) => (
          <div key={index} className="quest-card">
            <h3 className="quest-name">{quest.name}</h3>
            <p className="route-label">Route</p>
            <p className="quest-route">{quest.route}</p>
            <a href="#" className="more-info">More Information →</a>
          </div>
        ))}
      </div>

      {/* Bottom Navigation Menu */}
      <div style={navBarStyle}>
                <button style={iconButtonStyle} onClick={() => navigate("/home-page")}>🏠</button>
                <button style={iconButtonStyle} onClick={() => navigate("/profile-page")}>👤</button>
                <button style={iconButtonStyle} onClick={() => navigate("/leaderboard")}>🏆</button>
      </div>
    </div>
  );
}

/* Button Style */
const buttonStyle = {
  display: 'block',
  width: '80%',
  padding: '10px',
  margin: '10px auto',
  fontSize: '16px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer'
};

/* Bottom Navigation Menu Style */
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

/* Icon-like Button Style */
const iconButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer'
};

export default Home;
