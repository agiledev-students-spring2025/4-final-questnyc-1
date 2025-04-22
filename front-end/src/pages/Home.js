import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import '../styles/index.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentQuest, setCurrentQuest] = useState(null);
  const [availableQuests, setAvailableQuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHomeData = async () => {
    try {
      const userResponse = await fetch(`http://localhost:5000/api/user/${user._id}/quests/current`);
      const currentQuests = await userResponse.json();
      
      const questsResponse = await fetch('http://localhost:5000/api/quests');
      const availableQuestsData = await questsResponse.json();
      
      // Get list of completed quests
      const completedQuestsResponse = await fetch(`http://localhost:5000/api/auth/users/${user._id}/fullprofile`);
      const userProfile = await completedQuestsResponse.json();
      
      const completedQuestIds = userProfile.completedQuests.map(q => q.questId._id);
      
      if (currentQuests && currentQuests.length > 0) {
        const activeQuest = currentQuests[0];
        const questDetails = activeQuest.questId;
        
        const nextCheckpointIndex = activeQuest.checkpointProgress.findIndex(cp => !cp.completed);
        const nextCheckpoint = nextCheckpointIndex !== -1 
          ? questDetails.checkpoints[nextCheckpointIndex] 
          : null;
        
        setCurrentQuest({
          id: questDetails._id,
          name: questDetails.name,
          nextCheckpoint: nextCheckpoint ? nextCheckpoint.name : 'All checkpoints completed',
          nextCheckpointId: nextCheckpoint ? nextCheckpoint._id : null,
          progress: (activeQuest.checkpointProgress.filter(cp => cp.completed).length / questDetails.checkpoints.length) * 100
        });
  
        // Filter out current quest AND completed quests
        const filtered = availableQuestsData.filter(q => 
          q._id !== questDetails._id && !completedQuestIds.includes(q._id)
        );
        setAvailableQuests(filtered.map(q => ({
          id: q._id,
          name: q.name,
          route: q.checkpoints.map(c => c.name).join(' → ')
        })));
      } else {
        setCurrentQuest(null);
        // Filter out completed quests only  
        const filtered = availableQuestsData.filter(q => !completedQuestIds.includes(q._id));
        setAvailableQuests(filtered.map(q => ({
          id: q._id,
          name: q.name,
          route: q.checkpoints.map(c => c.name).join(' → ')
        })));
      }
    } catch (error) {
      console.error("Failed to fetch home data:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchHomeData();
  }, [user, navigate]);

  const handleCompleteCheckpoint = async () => {
    if (!currentQuest?.nextCheckpointId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/quests/${currentQuest.id}/checkpoint/${currentQuest.nextCheckpointId}/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        if (data.allCompleted) {
          alert('Quest completed!');
          setCurrentQuest(null);
        }
        fetchHomeData();
      } else {
        alert(data.message || 'Failed to complete checkpoint');
      }
    } catch (error) {
      console.error("Failed to complete checkpoint:", error);
      alert('Failed to complete checkpoint');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestSelect = (questId) => {
    navigate(`/quest-detail/${questId}`);
  };

  // In Home.js, update the return statement:

return (
  <div className="container">
    <div className="quest-in-progress-section">
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
          {currentQuest.nextCheckpointId && (
            <button 
              className="btn btn-primary btn-block mt-md"
              onClick={handleCompleteCheckpoint}
              disabled={isLoading}
            >
              {isLoading ? 'Completing...' : 'Complete Checkpoint'}
            </button>
          )}
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
    </div>

    <div className="scrollable-content">
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
    </div>

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