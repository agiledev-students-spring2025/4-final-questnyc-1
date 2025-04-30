import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="nav-bar-container">
      <div className="nav-bar">
        <button
          className={`nav-icon ${isActive("/home-page") ? "active" : ""}`}
          onClick={() => navigate("/home-page")}
        >
          🏠
        </button>
        <button
          className={`nav-icon ${isActive("/profile-page") ? "active" : ""}`}
          onClick={() => navigate("/profile-page")}
        >
          👤
        </button>
        <button
          className={`nav-icon ${isActive("/leaderboard") ? "active" : ""}`}
          onClick={() => navigate("/leaderboard")}
        >
          🏆
        </button>
      </div>
    </div>
  );
};

export default NavBar;