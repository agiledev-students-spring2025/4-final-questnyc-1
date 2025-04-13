// scripts/testQuestDatabase.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quest from '../models/Quest.js';

dotenv.config();

const testDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');
    
    // Create a sample quest
    const sampleQuest = {
      name: 'Test Brooklyn Bridge Walk',
      description: 'A test quest to explore the iconic Brooklyn Bridge',
      theme: 'Historic NYC',
      difficulty: 'easy',
      estimatedTime: 90, // minutes
      distance: 2.4, // kilometers
      startLocation: {
        coordinates: [-74.0039, 40.7128] // Example coordinates for City Hall
      },
      checkpoints: [
        {
          name: 'City Hall',
          description: 'Start your journey at City Hall',
          location: {
            coordinates: [-74.0039, 40.7128]
          },
          hints: ['Look for the large steps leading to the entrance'],
          trivia: 'City Hall is one of the oldest continuously used city halls in the nation.',
          challengeType: 'quiz',
          challengeData: {
            question: 'What year was the current City Hall building completed?',
            options: ['1802', '1812', '1822', '1832'],
            answer: '1812'
          },
          order: 1
        },
        {
          name: 'Brooklyn Bridge Walkway',
          description: 'Cross the iconic walkway of the Brooklyn Bridge',
          location: {
            coordinates: [-73.9968, 40.7061]
          },
          order: 2
        }
      ],
      rewardXP: 300,
      rewardItems: ['Brooklyn Bridge Badge'],
      expiresAt: new Date(2026, 0, 1)
    };
    
    // First, try to find if there's already a quest with this name
    const existingQuest = await Quest.findOne({ name: sampleQuest.name });
    
    if (existingQuest) {
      console.log('Found existing test quest:', existingQuest.name);
      console.log('Description:', existingQuest.description);
      console.log('Checkpoints:', existingQuest.checkpoints.length);
    } else {
      // If it doesn't exist, create it
      console.log('Creating new test quest...');
      const createdQuest = await Quest.create(sampleQuest);
      console.log('Successfully created test quest with ID:', createdQuest._id);
    }
    
    // Query all quests
    console.log('\nRetrieving all quests:');
    const allQuests = await Quest.find().select('name theme difficulty');
    console.log(`Found ${allQuests.length} quests:`);
    allQuests.forEach(quest => {
      console.log(`- ${quest.name} (${quest.theme}, ${quest.difficulty})`);
    });
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
    console.log('Database test completed successfully!');
  } catch (error) {
    console.error('Error testing database:', error);
  }
};

testDatabase();