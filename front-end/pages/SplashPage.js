import React from 'react';
import { useNavigate } from 'react-router-dom';

function SplashPage() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to QuestNYC!</h1>
            <div style={{ width: 200, height: 200, backgroundColor: '#ccc', margin: '0 auto' }}>
                Logo
            </div>
            <div style={{ marginTop: '20px' }}>
                <button onClick={() => navigate('/login')}>Log In</button>
                <button onClick={() => navigate('/create-account')} style={{ marginLeft: '10px' }}>
                    Create An Account
                </button>
            </div>
            <p style={{ marginTop: '20px' }}>
                <a href="#">Privacy Policy</a>
            </p>
            <p>© Copyright 2025 QuestNYC Team</p>
        </div>
    );
}

export default SplashPage;
