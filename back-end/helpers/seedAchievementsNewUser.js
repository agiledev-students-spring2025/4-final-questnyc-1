import Achievement from '../models/Achievement.js';
import { defaultAchievements } from './defaultAchievements.js';

export async function seedAchievementsNewUser(userId) {
  const withUser = defaultAchievements.map(a => ({
    ...a,
    userId,
    progress: 0,
    completed: false
  }));

  await Achievement.insertMany(withUser);
}
