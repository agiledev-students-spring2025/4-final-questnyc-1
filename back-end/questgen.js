import dotenv from 'dotenv'
import axios from 'axios'
import mongoose from 'mongoose'
import Quest from './models/Quest.js'

dotenv.config()

const prompt = `
Create a JSON quest about a real NYC neighborhood.
Format: a JSON array with ONE object.
Include:
- name, description, theme ("Historic NYC", "Art", "Foodie Hunt")
- difficulty ("easy", "medium", "hard")
- estimatedTime (minutes), distance (km)
- startLocation: { type: "Point", coordinates: [longitude, latitude] }
- rewardXP (number), rewardItems (string array)
- completionCriteria: "all-checkpoints"
- minCheckpointsRequired (number)

Each quest must have 2 checkpoints:
Each checkpoint should include:
- name, description, location (GeoJSON), hints (array), trivia
- challengeType ("quiz" or "riddle")
- challengeData (if quiz: { question, options, answer }, if riddle: string)
- order (1, 2)

Respond ONLY with a raw JSON array. No explanation.
`

async function generateQuest() {
  const res = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
    model: 'openai/gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }]
  }, {
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json'
    }
  })

  const content = res.data.choices[0].message.content
  return JSON.parse(content)
}

async function insertQuest() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    const quests = await generateQuest()
    await Quest.insertMany(quests)
    console.log('AI-generated quest inserted successfully!')
  } catch (err) {
    console.error('Error inserting quest:', err.message || err)
  } finally {
    await mongoose.disconnect()
  }
}

insertQuest()