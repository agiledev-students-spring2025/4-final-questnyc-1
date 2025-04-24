// helpers/achievementUtils.js
import Achievement from '../models/Achievement.js';

export async function updateAchievement(userId, name, increment = 1) {
  const ach = await Achievement.findOne({ userId, name });
  if (!ach) return;

  ach.progress += increment;
  if (ach.progress >= ach.total) {
    ach.progress = ach.total;
    ach.completed = true;
  }
  ach.updatedAt = new Date();
  await ach.save();
}
