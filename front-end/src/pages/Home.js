import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

const Home = () => {
  const navigate = useNavigate();
  const [currentQuest, setCurrentQuest] = useState(null);
  const [availableQuests, setAvailableQuests] = useState([]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/home');
        const data = await response.json();

        console.log("Fetched home data:", data);

        setCurrentQuest(data.progressData);

        if (data.progressData) {
          const filtered = data.availableQuests.filter(
            q => q.id !== data.progressData.id
          );
          setAvailableQuests(filtered);
        } else {
          setAvailableQuests(data.availableQuests);
        }
      } catch (error) {
        console.error("Failed to fetch home data:", error);
      }
    };

    fetchHomeData();
  }, []);

  const handleQuestSelect = (questId) => {
    navigate(`/quest-detail/${questId}`);
  };

  return (
    <div className="container">
      {/* Quest In Progress */}
      <h1 className="section-header text-center">Quest In Progress</h1>
      {currentQuest ? (
        <div className="quest-box">
          <h2 className="quest-name">{currentQuest.name}</h2>
          <p className="quest-checkpoint">
            Next Checkpoint: <span>{currentQuest.nextCheckpoint}</span>
          </p>
          <div className="progress-container">
            <div
              className="progress-fill"
              style={{ width: `${currentQuest.progress}%` }}
            />
          </div>

          <a
            onClick={() => handleQuestSelect(currentQuest.id)}
            className="more-info"
          >
            More Information →
          </a>
        </div>
      ) : (
        <p className="text-center">No quest currently in progress.</p>
      )}

      {/* Available Quests */}
      <h2 className="available-quests-title">Available Quests</h2>
      <hr className="separator" />
      <div className="quests-list">
        {availableQuests.length > 0 ? (
          availableQuests.map((quest) => (
            <div key={quest.id} className="quest-item">
              <h3 className="quest-name">{quest.name}</h3>
              <p className="route-label">Route</p>
              <p className="quest-route">{quest.route}</p>

              <a
                onClick={() => handleQuestSelect(quest.id)}
                className="more-info"
              >
                More Information →
              </a>
            </div>
          ))
        ) : (
          <p className="text-center">No available quests at the moment.</p>
        )}
      </div>

      {/* Bottom Navigation Menu */}
      <div className="nav-bar">
        <button className="nav-icon active" onClick={() => navigate("/home-page")}>
          🏠
        </button>
        <button className="nav-icon" onClick={() => navigate("/profile-page")}>
          👤
        </button>
        <button className="nav-icon" onClick={() => navigate("/leaderboard")}>
          🏆
        </button>
      </div>
    </div>
  );
};

export default Home;