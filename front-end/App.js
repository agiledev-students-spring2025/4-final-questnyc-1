import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import PasswordResetPrompt from './pages/PasswordResetPrompt';
import PasswordResetConfirmation from './pages/PasswordResetConfirmation';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/reset-password" element={<PasswordResetPrompt />} />
                <Route path="/reset-password-confirmation" element={<PasswordResetConfirmation />} />
            </Routes>
        </div>
    );
}

export default App;
