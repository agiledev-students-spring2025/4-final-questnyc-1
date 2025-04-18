import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import mongoose from 'mongoose'
import Friend from './models/Friend.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/static', express.static('public'))

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

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
 * Friend Routes (from MongoDB)
 */
app.get('/api/friends/:friendId/profile', async (req, res) => {
  try {
    const friend = await Friend.findById(req.params.friendId)
    if (!friend) return res.status(404).json({ message: 'Friend not found' })
    res.json(friend)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/friends', async (req, res) => {
  try {
    const friends = await Friend.find()
    res.json(friends)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch friends' })
  }
})

/**
 * Quest Routes
 */
let currentQuest = null

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function generateRandomQuest(id) {
  const questNames = [
    'Brooklyn Bridge Walk', 'Harlem Heritage Trail', 'Central Park Nature',
    'Times Square Photo Hunt', 'The High Line Adventure', 'Prospect Park Loop',
    'Coney Island Discovery', 'Roosevelt Island Tram Trek', 'Museum Mile March',
    'Flushing Meadows', 'Battery Park Breeze', 'DUMBO Art Hunt', 'Greenwich Village Ghost Tour',
    'Bronx Botanical Explorer', 'Williamsburg Mural Walk', 'Hudson Riverfront Hike',
    'Financial District History Dash', 'SoHo Gallery Hop', 'LIC Skyline Stroll', 'Chinatown Flavor'
  ]

  const pointPools = {
    'Brooklyn Bridge Walk': ['City Hall', 'Brooklyn Bridge Walkway', 'DUMBO'],
    'Harlem Heritage Trail': ['Apollo Theater', 'Sylvia’s Restaurant', 'Strivers’ Row'],
    'Central Park Nature': ['Bethesda Fountain', 'Strawberry Fields', 'Belvedere Castle'],
    'Times Square Photo Hunt': ['Red Steps', 'TKTS Booth', '7th Ave Lights'],
    'The High Line Adventure': ['Gansevoort Street Entrance', 'Chelsea Market', 'Hudson Yards'],
    'Prospect Park Loop': ['Grand Army Plaza', 'Prospect Lake', 'Boathouse'],
    'Coney Island Discovery': ['Luna Park Entrance', 'Nathan’s Famous Hot Dogs', 'Coney Island Boardwalk'],
    'Roosevelt Island Tram Trek': ['Tram Station Manhattan', 'Four Freedoms Park', 'Lighthouse Park'],
    'Museum Mile March': ['Metropolitan Museum of Art', 'Guggenheim Museum', 'El Museo del Barrio'],
    'Flushing Meadows': ['Unisphere', 'Queens Museum', 'USTA Billie Jean King National Tennis Center'],
    'Battery Park Breeze': ['Castle Clinton', 'Bosque Fountain', 'Statue of Liberty Viewpoint'],
    'DUMBO Art Hunt': ['Pebble Beach', 'St. Ann’s Warehouse', 'Washington Street Photo Spot'],
    'Greenwich Village Ghost Tour': ['Jefferson Market Library', 'Stonewall Inn', 'Washington Mews'],
    'Bronx Botanical Explorer': ['NY Botanical Garden Gate', 'Conservatory', 'Native Plant Garden'],
    'Williamsburg Mural Walk': ['Bedford Ave', 'The Color Factory', 'Domino Park'],
    'Hudson Riverfront Hike': ['Pier 57 Rooftop Park', 'Little Island', 'Pier 64'],
    'Financial District History Dash': ['Wall Street Bull', 'Federal Hall', 'Trinity Church'],
    'SoHo Gallery Hop': ['The Drawing Center', 'Jeffrey Deitch Gallery', 'Team Gallery'],
    'LIC Skyline Stroll': ['Gantry Plaza State Park', 'Pepsi-Cola Sign', 'Hunters Point Library'],
    'Chinatown Flavor': ['Doyers Street', 'Nom Wah Tea Parlor', 'Columbus Park']
  }

  const rewardEXP = getRandomInt(100, 1000)
  const expirationDate = randomDate(new Date(2025, 4, 1), new Date(2026, 4, 1))
    .toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit'
    })

  const nameRandomized = getRandomItem(questNames)
  const points = pointPools[nameRandomized]

  return {
    id,
    name: nameRandomized,
    points: points.map((p, i) => `Point ${i + 1}: ${p}`),
    expiration: expirationDate,
    reward: rewardEXP
  }
}

const staticQuestList = Array.from({ length: 6 }, (_, i) => generateRandomQuest(`quest${i + 1}`))

app.get('/api/quests/:questId', (req, res) => {
  const questId = req.params.questId
  const quest = staticQuestList.find(q => q.id === questId)
  if (!quest) return res.status(404).json({ message: 'Quest not found' })
  res.json(quest)
})

app.post('/api/quests/:questId/accept', (req, res) => {
  const questId = req.params.questId
  const quest = staticQuestList.find(q => q.id === questId)
  if (!quest) return res.status(404).json({ message: 'Quest not found' })
  currentQuest = quest
  res.json({ message: `Quest ${questId} accepted`, quest: currentQuest })
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
app.get('/api/leaderboard', (req, res, next) => {
  axios
    .get("https://my.api.mockaroo.com/mock_player_rankings.json?key=b65896f0")
    .then(apiResponse => {
      const sorted = apiResponse.data
        .sort((a, b) => b.score - a.score)
        .map((player, index) => ({
          rank: index + 1,
          username: player.username,
          score: player.score
        }));
      res.json(sorted);
    })
    .catch(err => next(err));
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
  const availableQuests = staticQuestList
    .filter(q => !currentQuest || q.id !== currentQuest.id)
    .map(q => ({
      id: q.id,
      name: q.name,
      route: q.points.map(p => p.replace(/^Point \d+: /, '')).join(' → ')
    }));

  const progressData = currentQuest
    ? {
      id: currentQuest.id,
      name: currentQuest.name,
      nextCheckpoint: currentQuest.points[1]?.replace(/^Point \d+: /, '') || 'Checkpoint',
      progress: 40
    }
    : null;

  res.json({ progressData, availableQuests });
})

export default app
