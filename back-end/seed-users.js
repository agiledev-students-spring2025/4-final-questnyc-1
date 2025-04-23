import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // path to your User model

dotenv.config();

const users = [
  { username: 'alice', email: 'alice@example.com', password: 'password1', exp: 3000 },
  { username: 'bob', email: 'bob@example.com', password: 'password2', exp: 2500 },
  { username: 'charlie', email: 'charlie@example.com', password: 'password3', exp: 3200 },
  { username: 'dave', email: 'dave@example.com', password: 'password4', exp: 1800 },
  { username: 'eve', email: 'eve@example.com', password: 'password5', exp: 3500 },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await User.deleteMany(); // Optional: clear existing users
    await User.insertMany(users);
    console.log('Users seeded successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
