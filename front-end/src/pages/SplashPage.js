import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';

function SplashPage() {
    const navigate = useNavigate();

    return (
        <div className="container text-center">
            <h1 className="mt-lg mb-md">Welcome to QuestNYC!</h1>
            
            <div className="profile-pic" style={{ width: 200, height: 200, margin: '0 auto' }}>
                Logo
            </div>
            
            <div className="mt-lg">
                <button 
                    onClick={() => navigate('/login')} 
                    className="btn btn-primary"
                >
                    Log In
                </button>
                
                <button 
                    onClick={() => navigate('/create-account')} 
                    className="btn"
                    style={{ marginLeft: 'var(--spacing-md)' }}
                >
                    Create An Account
                </button>
            </div>
            
            <div className="mt-lg">
                <p className="mb-sm">
                    <a href="#">Privacy Policy</a>
                </p>
                <p>© Copyright 2025 QuestNYC Team</p>
            </div>
        </div>
    );
}

export default SplashPage;