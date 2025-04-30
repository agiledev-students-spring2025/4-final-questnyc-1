import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Achievement from './models/Achievement.js';
import User from './models/User.js';

dotenv.config();

const defaultAchievements = [
  { name: 'First Quest Accepted', description: 'Accept your first quest', total: 1, type: 'custom' },
  { name: 'First Quest Completed', description: 'Complete your first quest', total: 1, type: 'custom' },
  { name: 'Daily Quests', description: 'Complete 3 quests in one day', total: 3, type: 'daily' },
  { name: 'Weekly Warrior', description: 'Complete 7 quests in a week', total: 7, type: 'weekly' },
  { name: 'Streak Starter', description: 'Do a quest 3 days in a row', total: 3, type: 'streak' },
  { name: 'Friendship Quest', description: 'Add 3 friends', total: 3, type: 'custom' },
  { name: 'Ghost Hunter', description: 'Complete a “Ghost Stories” quest', total: 1, type: 'custom' },
  { name: 'History Buff', description: 'Complete 3 “Historic NYC” quests', total: 3, type: 'custom' },
  { name: 'Art Enthusiast', description: 'Complete 2 “Hidden Art” quests', total: 2, type: 'custom' },
  { name: 'Food Explorer', description: 'Complete a “Foodie Hunt” quest', total: 1, type: 'custom' },
  { name: 'Nature Lover', description: 'Complete 2 “Nature” quests', total: 2, type: 'custom' },
  { name: 'Architecture Aficionado', description: 'Complete 2 “Architecture” quests', total: 2, type: 'custom' },
  { name: 'All the Way', description: 'Complete 5 quests with 100% checkpoint completion', total: 5, type: 'custom' },
  { name: 'Checkpoint Crusher', description: 'Complete 25 checkpoints total', total: 25, type: 'custom' },
  { name: 'High Roller XP', description: 'Earn 500 XP from one quest', total: 1, type: 'custom' },
  { name: 'Rising Star', description: 'Earn 1000 XP total', total: 1000, type: 'custom' },
  { name: 'Tenacious Traveler', description: 'Complete 10 quests total', total: 10, type: 'custom' },
  { name: 'Socialite', description: 'Add 5 friends', total: 5, type: 'custom' },
  { name: 'Completed Quests', description: 'Complete 5 quests total', total: 5, type: 'custom' }

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
        .filter(a => !existingNames.includes(a.name))
        .map(a => ({ ...a, userId: user._id, progress: 0, completed: false }));

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
