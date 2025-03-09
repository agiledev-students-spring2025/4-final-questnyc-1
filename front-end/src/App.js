import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import PasswordResetPrompt from './pages/PasswordResetPrompt';
import PasswordResetConfirmation from './pages/PasswordResetConfirmation';
import ProfilePage from './pages/ProfilePage'
import FriendProfilePage from './pages/FriendProfilePage'
import FriendsListPage from './pages/FriendsListPage'
import InviteFriendPage from './pages/InviteFriendPage'
import Home from './pages/Home'
import LeaderboardPage from './pages/LeaderboardPage'
import AchievementsPage from './pages/AchievementsPage'
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
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/quest-detail" element={<QuestDetailPage />} />
                <Route path="/completed-quests" element={<CompletedQuestsPage />} />


            </Routes>
        </div>
    );
}

export default App;
