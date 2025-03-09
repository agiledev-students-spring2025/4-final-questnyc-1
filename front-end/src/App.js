import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SplashPage from './pages/SplashPage.js';
import LoginPage from './pages/LoginPage.js';
import CreateAccountPage from './pages/CreateAccountPage.js';
import PasswordResetPrompt from './pages/PasswordResetPrompt.js';
import PasswordResetConfirmation from './pages/PasswordResetConfirmation.js';
import ProfilePage from './pages/ProfilePage.js';
import FriendProfilePage from './pages/FriendProfilePage.js';
import FriendsListPage from './pages/FriendsListPage.js';
import InviteFriendPage from './pages/InviteFriendPage.js';
import Home from './pages/Home.js';
import QuestDetailPage from './pages/QuestDetailPage.js';
import CompletedQuestsPage from './pages/CompletedQuestsPage.js';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<SplashPage />} />
                <Route path="/home-page" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/create-account" element={<CreateAccountPage />} />
                <Route path="/reset-password" element={<PasswordResetPrompt />} />
                <Route path="/reset-password-confirmation" element={<PasswordResetConfirmation />} />
                <Route path="/profile-page" element={<ProfilePage />} />
                <Route path="/friend-profile-page" element={<FriendProfilePage />} />
                <Route path="/friends-list-page" element={<FriendsListPage />} />
                <Route path="/invite-friend-page" element={<InviteFriendPage />} />
                <Route path="/quest-detail" element={<QuestDetailPage />} />
                <Route path="/completed-quests" element={<CompletedQuestsPage />} />
            </Routes>
        </div>
    );
}

export default App;
