import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Achievement from './models/Achievement.js';
import User from './models/User.js';

dotenv.config();

const defaultAchievements = [
  {
    name: 'First Quest Accepted',
    description: 'Accept your first quest',
    total: 1,
    type: 'custom',
  },
  {
    name: 'Daily Quests',
    description: 'Complete 3 quests in one day',
    total: 3,
    type: 'daily',
  },
  {
    name: 'Weekly Warrior',
    description: 'Complete 7 quests in a week',
    total: 7,
    type: 'weekly',
  },
  {
    name: 'Streak Starter',
    description: 'Do a quest 3 days in a row',
    total: 3,
    type: 'streak',
  },
  {
    name: 'Friendship Quest',
    description: 'Add 3 friends',
    total: 3,
    type: 'custom',
  }
];

async function seedAchievementsForAllUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const users = await User.find();
    console.log(`Found ${users.length} users.`);

    for (const user of users) {
      const existingAchievements = await Achievement.find({ userId: user._id });
      const existingNames = existingAchievements.map(a => a.name);

      const newAchievements = defaultAchievements
        .filter(a => !existingNames.includes(a.name)) // avoid duplicates
        .map(a => ({
          ...a,
          userId: user._id,
          progress: 0,
          completed: false
        }));

      if (newAchievements.length > 0) {
        await Achievement.insertMany(newAchievements);
        console.log(`Seeded ${newAchievements.length} achievements for user ${user.username}`);
      } else {
        console.log(`All achievements already exist for user ${user.username}`);
      }
    }

    console.log('Done seeding all users!');
    process.exit();
  } catch (err) {
    console.error('Error seeding achievements:', err);
    process.exit(1);
  }
}

seedAchievementsForAllUsers();
