import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/static', express.static('public'))

/**
 * Profile Routes
 */
app.get('/api/profile', (req, res) => {
    const userProfile = {
        profilePic: 'https://picsum.photos/seed/selfie/100',
        username: 'John Smith',
        firstJoined: 'Feburary 2024'
    }
    res.json(userProfile)
})

app.put('/api/profile', (req, res) => {
    const updatedProfile = req.body
    res.json({ message: 'Profile updated successfully', updatedProfile })
})

/**
 * Friend Profile Route
 */
const friends = {
    1: {
        profilePic: 'https://picsum.photos/seed/sarah/100',
        username: 'Sarah',
        firstJoined: 'February 2023'
    },
    2: {
        profilePic: 'https://picsum.photos/seed/adam/100',
        username: 'Adam',
        firstJoined: 'March 2023'
    },
    3: {
        profilePic: 'https://picsum.photos/seed/isaac/100',
        username: 'Isaac',
        firstJoined: 'April 2023'
    },
    4: {
        profilePic: 'https://picsum.photos/seed/santa/100',
        username: 'Santa',
        firstJoined: 'December 2022'
    },
    5: {
        profilePic: 'https://picsum.photos/seed/happy/100',
        username: 'Happy',
        firstJoined: 'May 2023'
    }
};

app.get('/api/friends/:friendId/profile', (req, res) => {
    const friendId = req.params.friendId;
    const friend = friends[friendId];

    if (!friend) {
        return res.status(404).json({ message: 'Friend not found' });
    }

    res.json({ id: friendId, ...friend });
});


/**
 * Quest Routes
 */
app.get('/api/quests/:questId', (req, res) => {
    const questId = req.params.questId
    const quest = {
        id: questId,
        name: 'Brooklyn Bridge Walk',
        points: ['Point 1: City Hall', 'Point 2: Brooklyn Bridge Walkway', 'Point 3: DUMBO'],
        expiration: '12:00 MM/DD/YY',
        reward: '500 XP'
    }
    res.json(quest)
})

app.post('/api/quests/:questId/accept', (req, res) => {
    const questId = req.params.questId
    res.json({ message: `Quest ${questId} accepted` })
})

/**
 * Completed Quests Route
 */
app.get('/api/completed-quests', (req, res) => {
    const completedQuests = [
        {
            id: 1,
            title: 'Quest #1',
            information: '[Quest Information]',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            progress: '5/5',
            progressPercent: 100
        },
        {
            id: 2,
            title: 'Quest #2',
            information: '[Quest Information]',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            progress: '3/3',
            progressPercent: 100
        },
        {
            id: 3,
            title: 'Quest #3',
            information: '[Quest Information]',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            progress: '7/7',
            progressPercent: 100
        }
    ]
    res.json(completedQuests)
})

/**
 * Achievements Route
 */
app.get('/api/achievements', (req, res) => {
    const achievements = [
        { name: 'Achievement #1', progress: 2, total: 3, completed: false },
        { name: 'Achievement #2', progress: 1, total: 4, completed: false },
        { name: 'Achievement #3', progress: 0, total: 7, completed: false },
        { name: 'Achievement #4', progress: 5, total: 5, completed: true },
        { name: 'Achievement #5', progress: 2, total: 2, completed: true }
    ]
    res.json(achievements)
})

/**
 * Authentication Routes
 */
app.post('/api/login', (req, res) => {
    const { username, password } = req.body
    res.json({ message: 'Logged in successfully', token: 'fake-jwt-token' })
})

app.post('/api/register', (req, res) => {
    const { username, password, confirmPass } = req.body
    if (password !== confirmPass) {
        return res.status(400).json({ message: 'Passwords do not match' })
    }
    res.json({ message: 'Account created successfully' })
})

/**
 * Password Reset Routes
 */
app.post('/api/password-reset-request', (req, res) => {
    const { email, confirmEmail } = req.body
    if (email !== confirmEmail) {
        return res.status(400).json({ message: 'Emails do not match' })
    }
    res.json({ message: 'Password reset link has been sent to your email address' })
})

app.post('/api/password-reset-confirmation', (req, res) => {
    const { newPassword, confirmNewPassword } = req.body
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'Passwords do not match' })
    }
    res.json({ message: 'Password has been successfully reset' })
})

/**
 * Leaderboard Route
 */
app.get('/api/leaderboard', (req, res) => {
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
    ]
    res.json(leaderboardData)
})

/**
 * Invite Friend Route
 */
app.post('/api/invite-friend', (req, res) => {
    const { phoneNumber } = req.body
    res.json({ message: `Invitation sent to ${phoneNumber}` })
})

/**
 * Home Data Route
 */
app.get('/api/home', (req, res) => {
    const currentQuest = {
        name: 'Explore Central Park',
        nextCheckpoint: 'Bethesda Fountain',
        progress: 40
    }
    const availableQuests = [
        { name: 'Brooklyn Bridge Walk', route: 'City Hall → Brooklyn Bridge → DUMBO' },
        { name: 'Grand Concourse Tour', route: 'Bronx Courthouse → Bronx Museum of Arts → Andrew Freedman Home' }
    ]
    res.json({ currentQuest, availableQuests })
})

export default app