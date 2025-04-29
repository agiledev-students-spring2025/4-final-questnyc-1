import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';
import logo from '../assets/questnyclogo.png';

function SplashPage() {
    const navigate = useNavigate();

    return (
        <div className="splash-container">
            <div className="splash-content">
                <h1 className="mb-md">Welcome to QuestNYC!</h1>
                
                <div className="logo-circle">
                    <img 
                        src={logo} 
                        alt="QuestNYC Logo" 
                    />
                </div>
                
                <div className="splash-buttons">
                    <button 
                        onClick={() => navigate('/login')} 
                        className="btn btn-primary"
                    >
                        Log In
                    </button>
                    
                    <button 
                        onClick={() => navigate('/create-account')} 
                        className="btn"
                    >
                        Create An Account
                    </button>
                </div>
                
                <div className="splash-footer">
                    <p className="mb-sm">
                        <a href="#">Privacy Policy</a>
                    </p>
                    <p>© Copyright 2025 QuestNYC Team</p>
                </div>
            </div>
        </div>
    );
}

export default SplashPage;