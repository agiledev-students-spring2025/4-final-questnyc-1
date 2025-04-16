import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Quest from './models/Quest.js';

dotenv.config();

const seedQuests = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create sample quests
    const quests = [
      {
        name: 'Brooklyn Bridge Walk',
        description: 'Explore the historic Brooklyn Bridge and surrounding areas',
        theme: 'Historic NYC',
        difficulty: 'easy',
        estimatedTime: 90, // minutes
        distance: 2.5, // kilometers
        startLocation: {
          type: 'Point',
          coordinates: [-73.9962, 40.7061] // Long, Lat for Brooklyn Bridge
        },
        checkpoints: [
          {
            name: 'City Hall',
            description: 'Start at City Hall Park',
            location: {
              type: 'Point',
              coordinates: [-74.0059, 40.7127]
            },
            hints: ['Look for the fountain', 'Near the subway entrance'],
            trivia: 'City Hall is the oldest city hall in the US that still houses its original government functions',
            challengeType: 'quiz',
            challengeData: {
              question: 'What year was City Hall completed?',
              options: ['1802', '1812', '1822', '1832'],
              answer: '1812'
            },
            order: 1
          },
          {
            name: 'Brooklyn Bridge Walkway',
            description: 'Walk to the center of Brooklyn Bridge',
            location: {
              type: 'Point',
              coordinates: [-73.9962, 40.7061]
            },
            hints: ['Look for the plaques', 'Great photo spot'],
            trivia: 'The Brooklyn Bridge was the world\'s first steel-wire suspension bridge',
            challengeType: 'riddle',
            challengeData: 'I connect two lands but I\'m not a bridge. I flow beneath your feet but I\'m not blood. What am I?',
            order: 2
          },
          {
            name: 'DUMBO',
            description: 'Finish at DUMBO (Down Under the Manhattan Bridge Overpass)',
            location: {
              type: 'Point',
              coordinates: [-73.9897, 40.7033]
            },
            hints: ['Famous photo spot on Washington Street', 'Near the carousel'],
            trivia: 'DUMBO was once an industrial area before becoming one of NYC\'s most expensive neighborhoods',
            challengeType: 'photo',
            challengeData: 'Take a photo of the Manhattan Bridge view from Washington Street',
            order: 3
          }
        ],
        rewardXP: 300,
        rewardItems: ['Brooklyn Bridge Badge', 'NYC Explorer Points'],
        isActive: true,
        completionCriteria: 'all-checkpoints',
        isVerified: true,
        generatedBy: 'admin'
      },
      {
        name: 'Central Park Nature',
        description: 'Discover the natural beauty of Central Park',
        theme: 'Nature',
        difficulty: 'medium',
        estimatedTime: 120,
        distance: 3.2,
        startLocation: {
          type: 'Point',
          coordinates: [-73.9654, 40.7829] // Central Park
        },
        checkpoints: [
          {
            name: 'Bethesda Fountain',
            description: 'Start at the iconic Bethesda Fountain',
            location: {
              type: 'Point',
              coordinates: [-73.9706, 40.7735]
            },
            hints: ['Near the lake', 'Look for the angel statue'],
            trivia: 'The Bethesda Fountain is one of the largest fountains in New York',
            challengeType: 'quiz',
            challengeData: {
              question: 'What is the name of the statue atop the fountain?',
              options: ['Angel of the Waters', 'Bethesda Angel', 'Central Park Angel', 'New York Guardian'],
              answer: 'Angel of the Waters'
            },
            order: 1
          },
          {
            name: 'Strawberry Fields',
            description: 'Visit the John Lennon memorial',
            location: {
              type: 'Point',
              coordinates: [-73.9753, 40.7756]
            },
            hints: ['Near West 72nd Street', 'Look for the mosaic'],
            trivia: 'Strawberry Fields is named after the Beatles song "Strawberry Fields Forever"',
            challengeType: 'riddle',
            challengeData: 'Imagine I\'m a circle within a square, honoring a man who is no longer there. What word do I spell?',
            order: 2
          }
        ],
        rewardXP: 250,
        rewardItems: ['Nature Explorer Badge', 'Central Park Map'],
        isActive: true,
        completionCriteria: 'all-checkpoints',
        isVerified: true,
        generatedBy: 'admin'
      }
    ];

    // Clear existing quests
    await Quest.deleteMany({});
    
    // Insert new quests
    await Quest.insertMany(quests);
    
    console.log('Quests seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding quests:', err.message);
    process.exit(1);
  }
};

seedQuests();