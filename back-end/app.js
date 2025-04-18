import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import axios from 'axios'
import mongoose from 'mongoose'
import Friend from './models/Friend.js'
import authRoutes from './routes/auth.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/api', authRoutes)

// MongoDB connection
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in the environment.')
  process.exit(1)
}
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

// Profile Routes
app.get('/api/profile', (req, res) => {
  const userProfile = {
    profilePic: 'https://picsum.photos/seed/selfie/100',
    username: 'John Smith',
    firstJoined: 'February 2024'
  }
  res.json(userProfile)
})

app.put('/api/profile', (req, res) => {
  const updatedProfile = req.body
  res.json({ message: 'Profile updated successfully', updatedProfile })
})

// Friend Routes
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

// Quest Generation Utilities
let currentQuest = null

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min)
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function generateRandomQuest(id) {
  const questNames = [ /* ...same list... */]
  const pointPools = { /* ...same pool... */ }

  const name = getRandomItem(questNames)
  const points = pointPools[name] || ['Checkpoint A', 'Checkpoint B', 'Checkpoint C']
  const rewardEXP = getRandomInt(100, 1000)
  const expirationDate = randomDate(new Date(2025, 4, 1), new Date(2026, 4, 1)).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit'
  })

  return {
    id,
    name,
    points: points.map((p, i) => `Point ${i + 1}: ${p}`),
    expiration: expirationDate,
    reward: rewardEXP
  }
}

const staticQuestList = Array.from({ length: 6 }, (_, i) => generateRandomQuest(`quest${i + 1}`))

app.get('/api/quests/:questId', (req, res) => {
  const quest = staticQuestList.find(q => q.id === req.params.questId)
  if (!quest) return res.status(404).json({ message: 'Quest not found' })
  res.json(quest)
})

app.post('/api/quests/:questId/accept', (req, res) => {
  const quest = staticQuestList.find(q => q.id === req.params.questId)
  if (!quest) return res.status(404).json({ message: 'Quest not found' })
  currentQuest = quest
  res.json({ message: `Quest ${quest.id} accepted`, quest })
})

// Completed Quests Route
app.get('/api/completed-quests', (req, res) => {
  res.json([
    { id: 1, title: 'Quest #1', information: '[Quest Information]', description: 'Lorem ipsum...', progress: '5/5', progressPercent: 100 },
    { id: 2, title: 'Quest #2', information: '[Quest Information]', description: 'Lorem ipsum...', progress: '3/3', progressPercent: 100 },
    { id: 3, title: 'Quest #3', information: '[Quest Information]', description: 'Lorem ipsum...', progress: '7/7', progressPercent: 100 }
  ])
})

// Achievements Route
app.get('/api/achievements', (req, res) => {
  res.json([
    { name: 'Achievement #1', progress: 2, total: 3, completed: false },
    { name: 'Achievement #2', progress: 1, total: 4, completed: false },
    { name: 'Achievement #3', progress: 0, total: 7, completed: false },
    { name: 'Achievement #4', progress: 5, total: 5, completed: true },
    { name: 'Achievement #5', progress: 2, total: 2, completed: true }
  ])
})

// Leaderboard Route
app.get('/api/leaderboard', (req, res, next) => {
  axios
    .get('https://my.api.mockaroo.com/mock_player_rankings.json?key=b65896f0')
    .then(apiResponse => {
      const sorted = apiResponse.data
        .sort((a, b) => b.score - a.score)
        .map((player, i) => ({
          rank: i + 1,
          username: player.username,
          score: player.score
        }))
      res.json(sorted)
    })
    .catch(err => next(err))
})

// Invite Friend Route
app.post('/api/invite-friend', (req, res) => {
  const { phoneNumber } = req.body
  res.json({ message: `Invitation sent to ${phoneNumber}` })
})

// Home Route
app.get('/api/home', (req, res) => {
  const availableQuests = staticQuestList
    .filter(q => !currentQuest || q.id !== currentQuest.id)
    .map(q => ({
      id: q.id,
      name: q.name,
      route: q.points.map(p => p.replace(/^Point \d+: /, '')).join(' → ')
    }))

  const progressData = currentQuest
    ? {
      id: currentQuest.id,
      name: currentQuest.name,
      nextCheckpoint: currentQuest.points[1]?.replace(/^Point \d+: /, '') || 'Checkpoint',
      progress: 40
    }
    : null

  res.json({ progressData, availableQuests })
})

export default app
