import Achievement from '../models/Achievement.js';

export async function seedAchievementsNewUser(userId) {
  const defaultAchievements = [
    { name: 'First Quest Accepted', description: 'Accept your first quest', total: 1, type: 'custom' },
    { name: 'First Quest Completed', description: 'Complete your first quest', total: 1, type: 'custom' },
    { name: 'Daily Quests', description: 'Complete 3 quests in one day', total: 3, type: 'daily' },
    { name: 'Weekly Warrior', description: 'Complete 7 quests in one week', total: 7, type: 'weekly' },
    { name: 'Streak Starter', description: 'Do a quest 3 days in a row', total: 3, type: 'streak' },
    { name: 'Accepted Quests', description: 'Accept 5 quests total', total: 5, type: 'custom' },
    { name: 'Completed Quests', description: 'Complete 5 quests total', total: 5, type: 'custom' },
  ];

  const withUser = defaultAchievements.map(a => ({
    ...a,
    userId,
    progress: 0,
    completed: false
  }));

  await Achievement.insertMany(withUser);
}
