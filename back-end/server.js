import express from 'express'
import cors from 'cors'
const app = express()
const PORT = process.env.PORT || 5000

import path from 'path'
import { fileURLToPath } from 'url'

app.use(cors())


// Middleware to parse JSON bodies
app.use(express.json())
app.use('/static', express.static('public'))

/**
 * Profile Routes
 */
app.get('/api/profile', (req, res) => {
    // Retrieve the authenticated user's profile data from your database
    const userProfile = {
        profilePic: 'https://via.placeholder.com/150',
        username: 'John Smith',
        firstJoined: 'January 2024'
    };
    res.json(userProfile);
});

app.put('/api/profile', (req, res) => {
    // Update the user's profile data
    const updatedProfile = req.body;
    // TODO: Save updatedProfile to your database
    res.json({ message: 'Profile updated successfully', updatedProfile });
});

/**
 * Friend Profile Route
 * GET a friend's profile by their ID.
 * For example: /api/friends/123/profile
 */
app.get('/api/friends/:friendId/profile', (req, res) => {
    const friendId = req.params.friendId;
    // Retrieve friend profile data based on friendId
    const friendProfile = {
        id: friendId,
        profilePic: 'https://via.placeholder.com/150',
        username: 'John Smith', // Replace with actual friend's username
        firstJoined: 'January 2024'
    };
    res.json(friendProfile);
});

/**
 * Quest Routes
 */
app.get('/api/quests/:questId', (req, res) => {
    const questId = req.params.questId;
    // Retrieve quest details based on questId
    const quest = {
        id: questId,
        name: "Brooklyn Bridge Walk",
        points: [
            "Point 1: City Hall",
            "Point 2: Brooklyn Bridge Walkway",
            "Point 3: DUMBO"
        ],
        expiration: "12:00 MM/DD/YY",
        reward: "500 XP"
    };
    res.json(quest);
});

app.post('/api/quests/:questId/accept', (req, res) => {
    const questId = req.params.questId;
    // TODO: Implement logic to accept the quest (e.g., update user quest status)
    res.json({ message: `Quest ${questId} accepted` });
});

/**
 * Completed Quests Route
 * Returns a list of completed quests for the authenticated user.
 */
app.get('/api/completed-quests', (req, res) => {
    // In a real app, fetch completed quests for the authenticated user.
    const completedQuests = [
        {
            id: 1,
            title: "Quest #1",
            information: "[Quest Information]",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            progress: "5/5",
            progressPercent: 100
        },
        {
            id: 2,
            title: "Quest #2",
            information: "[Quest Information]",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            progress: "3/3",
            progressPercent: 100
        },
        {
            id: 3,
            title: "Quest #3",
            information: "[Quest Information]",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            progress: "7/7",
            progressPercent: 100
        }
    ];
    res.json(completedQuests);
});

/**
 * Achievements Route
 * Returns a list of achievements for the authenticated user.
 */
app.get('/api/achievements', (req, res) => {
    // Return simulated achievements data.
    const achievements = [
        { name: 'Achievement #1', progress: 2, total: 3, completed: false },
        { name: 'Achievement #2', progress: 1, total: 4, completed: false },
        { name: 'Achievement #3', progress: 0, total: 7, completed: false },
        { name: 'Achievement #4', progress: 5, total: 5, completed: true },
        { name: 'Achievement #5', progress: 2, total: 2, completed: true }
    ];
    res.json(achievements);
});

/**
 * Authentication Routes
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // TODO: Validate credentials and create a session/token
    res.json({ message: 'Logged in successfully', token: 'fake-jwt-token' });
});

/**
 * Create Account (Registration) Route
 * This endpoint can be used by the Create Account page.
 */
app.post('/api/register', (req, res) => {
    const { username, password, confirmPass } = req.body;
    if (password !== confirmPass) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    // TODO: Hash the password and create a new user in your database
    res.json({ message: 'Account created successfully' });
});

/**
 * Password Reset Routes
 */
// Endpoint to request a password reset link.
app.post('/api/password-reset-request', (req, res) => {
    const { email, confirmEmail } = req.body;
    if (email !== confirmEmail) {
        return res.status(400).json({ message: 'Emails do not match' });
    }
    // TODO: Generate a reset token and send the reset link via email.
    res.json({ message: 'Password reset link has been sent to your email address' });
});

// Endpoint to confirm and set a new password.
app.post('/api/password-reset-confirmation', (req, res) => {
    const { newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    // TODO: Verify the reset token and update the password in your database.
    res.json({ message: 'Password has been successfully reset' });
});

/**
 * Leaderboard Route
 */
app.get('/api/leaderboard', (req, res) => {
    // Return simulated leaderboard data.
    const leaderboardData = [
        { rank: 1, username: 'Player1', score: 5000 },
        { rank: 2, username: 'Player2', score: 4500 },
        { rank: 3, username: 'Player3', score: 4200 },
        { rank: 4, username: 'Player4', score: 4000 },
        { rank: 5, username: 'Player5', score: 3800 },
        { rank: 6, username: 'Player6', score: 3500 },
        { rank: 7, username: 'Player7', score: 3200 },
        { rank: 8, username: 'Player8', score: 3000 },
        { rank: 9, username: 'Player9', score: 2800 }
    ];
    res.json(leaderboardData);
});

/**
 * Invite Friend Route
 */
app.post('/api/invite-friend', (req, res) => {
    const { phoneNumber } = req.body;
    // TODO: Integrate with an SMS or email service to send the invitation.
    res.json({ message: `Invitation sent to ${phoneNumber}` });
});

/**
 * Home Data Route
 */
app.get('/api/home', (req, res) => {
    // Return data for the home page including current quest and available quests.
    const currentQuest = {
        name: "Explore Central Park",
        nextCheckpoint: "Bethesda Fountain",
        progress: 40 // percentage
    };
    const availableQuests = [
        { name: "Brooklyn Bridge Walk", route: "City Hall → Brooklyn Bridge → DUMBO" },
        { name: "Grand Concourse Tour", route: "Bronx Courthouse → Bronx Museum of Arts → Andrew Freedman Home" }
    ];
    res.json({ currentQuest, availableQuests });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});