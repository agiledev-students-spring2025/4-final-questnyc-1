import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import os from 'os';

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try multiple env file locations
console.log('Attempting to load environment variables...');
const envPaths = [
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '.env'),
  path.resolve(process.cwd(), '.env')
];

let envLoaded = false;
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    console.log(`Found .env file at: ${envPath}`);
    dotenv.config({ path: envPath });
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  console.warn('No .env file found! Checking for environment variables directly...');
}

// Get MongoDB URI from environment variables or use a default for testing
const MONGODB_URI = process.env.MONGODB_URI || null;
console.log('MONGODB_URI value:', MONGODB_URI ? 'Found (value hidden for security)' : 'Not found');

// If still no MongoDB URI, prompt user for temporary connection
if (!MONGODB_URI) {
  console.log('\nNo MongoDB URI found in environment variables.');
  console.log('For testing, you can use a local MongoDB instance or MongoDB Atlas.');
  console.log('Example formats:');
  console.log('- Local: mongodb://localhost:27017/questnyc');
  console.log('- Atlas: mongodb+srv://username:password@cluster.mongodb.net/questnyc');

  console.log('\nTo fix this issue permanently:');
  console.log('1. Create a .env file in the root directory with content:');
  console.log('   MONGODB_URI=your_mongodb_connection_string');
  console.log('2. Make sure dotenv is installed: npm install dotenv');
  console.log('3. Check that the .env file is in the right location\n');

  // For this test, we'll use a default local MongoDB URI
  console.log('Attempting to connect with a default local connection (localhost)...');
}

// Display system info for debugging
console.log('\nSystem Information:');
console.log(`OS: ${os.type()} ${os.release()}`);
console.log(`Node Version: ${process.version}`);
console.log(`Current Directory: ${process.cwd()}`);
console.log(`Script Directory: ${__dirname}`);

// Simple sample quest data
const sampleQuest = {
  name: 'Test Brooklyn Bridge Walk',
  description: 'A test quest to explore the iconic Brooklyn Bridge',
  theme: 'Historic NYC',
  difficulty: 'easy',
  estimatedTime: 90,
  distance: 2.4,
  startLocation: {
    coordinates: [-74.0039, 40.7128]
  },
  checkpoints: [
    {
      name: 'City Hall',
      description: 'Start your journey at City Hall',
      location: {
        coordinates: [-74.0039, 40.7128]
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

// Function to test the database connection and operations
const testDatabase = async () => {
  let connection = null;

  try {
    // Try to connect with environment variable
    const uri = MONGODB_URI || 'mongodb://localhost:27017/questnyc';
    console.log('\nAttempting to connect to MongoDB...');
    console.log(`Using connection: ${uri.includes('localhost') ? uri : '***URI HIDDEN***'}`);

    connection = await mongoose.connect(uri);
    console.log('\nSUCCESS: Connected to MongoDB!');

    // Load the Quest model dynamically
    console.log('Loading Quest model...');
    const questModulePath = path.resolve(__dirname, '../models/Quest.js');

    if (!fs.existsSync(questModulePath)) {
      console.error(`ERROR: Quest model file not found at ${questModulePath}`);
      console.log('Trying alternate path...');

      const altQuestModulePath = path.resolve(process.cwd(), 'models/Quest.js');
      if (fs.existsSync(altQuestModulePath)) {
        console.log(`Found Quest model at ${altQuestModulePath}`);
      } else {
        throw new Error('Could not locate Quest model file');
      }
    }

    // Import Quest model
    const { default: Quest } = await import(path.resolve(__dirname, '../models/Quest.js'));
    console.log('Quest model loaded successfully!');

    // Check if collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nAvailable collections:');
    collections.forEach(collection => console.log(`- ${collection.name}`));

    // Create a test quest if no quests exist
    const existingQuest = await Quest.findOne({ name: sampleQuest.name });

    if (existingQuest) {
      console.log('\nFound existing test quest:');
      console.log(`- Name: ${existingQuest.name}`);
      console.log(`- Theme: ${existingQuest.theme}`);
      console.log(`- Difficulty: ${existingQuest.difficulty}`);
      console.log(`- Checkpoints: ${existingQuest.checkpoints.length}`);
    } else {
      console.log('\nCreating a new test quest...');
      const createdQuest = await Quest.create(sampleQuest);
      console.log('SUCCESS: Quest created with ID:', createdQuest._id);
    }

    // Query all quests
    console.log('\nRetrieving all quests:');
    const allQuests = await Quest.find().select('name theme difficulty');
    console.log(`Found ${allQuests.length} quests:`);
    allQuests.forEach(quest => {
      console.log(`- ${quest.name} (${quest.theme}, ${quest.difficulty})`);
    });

    console.log('\nDatabase test completed successfully!');
    return true;
  } catch (error) {
    console.error('\nERROR DETAILS:');
    console.error(`- Message: ${error.message}`);
    console.error(`- Stack: ${error.stack}`);

    if (error.message.includes('ECONNREFUSED')) {
      console.error('\nConnection refused. This usually means:');
      console.error('1. MongoDB is not running locally');
      console.error('2. The connection string is incorrect');
      console.error('3. Firewall is blocking the connection');
    }

    if (error.message.includes('authentication failed')) {
      console.error('\nAuthentication failed. Please check:');
      console.error('1. Username and password in your connection string');
      console.error('2. The database user has the correct permissions');
    }

    if (error.message.includes('timed out')) {
      console.error('\nConnection timed out. Please check:');
      console.error('1. Your network connection');
      console.error('2. If using Atlas, check if your IP is whitelisted');
    }

    return false;
  } finally {
    // Always disconnect when done
    if (connection) {
      console.log('\nDisconnecting from MongoDB...');
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
    }
  }
};

// Run the test
console.log('Starting database test...');
testDatabase()
  .then(success => {
    if (success) {
      console.log('\n✅ TEST PASSED: MongoDB connection and operations were successful!');
    } else {
      console.error('\n❌ TEST FAILED: Please check the error messages above.');
    }
    process.exit(success ? 0 : 1);
  })
  .catch(err => {
    console.error('Unexpected error during test execution:', err);
    process.exit(1);
  });