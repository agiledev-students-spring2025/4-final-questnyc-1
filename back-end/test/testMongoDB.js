// Load environment variables
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Specify the path to the .env file (adjust if needed)
// This assumes your .env is in the project root, one level up from the test directory
const envPath = join(__dirname, '..', '.env');

// Configure dotenv with the path
dotenv.config({ path: envPath });

// Log to check what's happening
console.log('ENV path:', envPath);
console.log('MONGODB_URI:', process.env.MONGODB_URI);

// Get the MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('ERROR: MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('Connection to MongoDB successful!');
    
    // Optional: create a test document to verify write operations
    const Test = mongoose.model('Test', new mongoose.Schema({ 
      name: String, 
      date: { type: Date, default: Date.now } 
    }));
    
    return Test.create({ name: 'test connection' });
  })
  .then(result => {
    console.log('Test document created:', result);
    
    // Close the connection after testing
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed.');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });