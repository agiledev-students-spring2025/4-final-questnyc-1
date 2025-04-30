import Achievement from '../models/Achievement.js';
import QuestCompletionLog from '../models/QuestCompletionLog.js';
import User from '../models/User.js';
import moment from 'moment';

export async function checkAndUpdateAchievements(userId, quest) {
  const newlyCompleted = [];

  const markProgress = async (name, increment = 1) => {
    const ach = await Achievement.findOne({ userId, name });
    if (!ach) return;

    const wasCompleted = ach.completed;

    ach.progress += increment;
    if (ach.progress >= ach.total) {
      ach.progress = ach.total;
      ach.completed = true;
    }

    ach.updatedAt = new Date();
    await ach.save();

    // Add XP if achievement just completed
    if (!wasCompleted && ach.completed) {
      newlyCompleted.push({ name: ach.name, description: ach.description });

      const xpForAchievement = 50;
      user.totalXP = (user.totalXP || 0) + xpForAchievement;
      await user.save();
    }
  };


  // XP tracking
  const user = await User.findById(userId);
  user.totalXP = (user.totalXP || 0) + (quest.rewardXP || 0);
  await user.save();

  if (quest.completionCriteria === 'all-checkpoints') { // check if all checkpoints were completed
    await markProgress('All the Way');
  }

  // Basic milestones
  await markProgress('First Quest Completed');
  await markProgress('Completed Quests');
  await markProgress('Checkpoint Crusher', quest.checkpoints.length);
  await markProgress('Rising Star', quest.rewardXP);

  if (quest.rewardXP >= 500) {
    await markProgress('High Roller XP');
  }

  // Theme-based achievements
  const themeMap = {
    'Ghost Stories': 'Ghost Hunter',
    'Historic NYC': 'History Buff',
    'Hidden Art': 'Art Enthusiast',
    'Foodie Hunt': 'Food Explorer',
    'Nature': 'Nature Lover',
    'Architecture': 'Architecture Aficionado'
  };

  if (themeMap[quest.theme]) {
    await markProgress(themeMap[quest.theme]);
  }

  // Daily quest tracking
  const todayStart = moment().startOf('day').toDate();
  const todayEnd = moment().endOf('day').toDate();

  const todayCount = await QuestCompletionLog.countDocuments({
    userId,
    completedAt: { $gte: todayStart, $lte: todayEnd }
  });

  if (todayCount === 3) {
    await markProgress('Daily Quests');
  }

  // Weekly quest tracking
  const weekStart = moment().startOf('week').toDate();
  const weekEnd = moment().endOf('week').toDate();

  const weekCount = await QuestCompletionLog.countDocuments({
    userId,
    completedAt: { $gte: weekStart, $lte: weekEnd }
  });

  if (weekCount === 7) {
    await markProgress('Weekly Warrior');
  }

  // Streak logic
  const today = moment().startOf('day');
  const last = moment(user.lastQuestDate).startOf('day');

  if (today.diff(last, 'days') === 1) {
    user.questStreak += 1;
  } else if (today.diff(last, 'days') > 1) {
    user.questStreak = 1;
  }

  user.lastQuestDate = new Date();
  await user.save();

  if (user.questStreak === 3) {
    await markProgress('Streak Starter');
  }

  return newlyCompleted;
}

export async function updateAchievement(userId, name, increment = 1) {
  const ach = await Achievement.findOne({ userId, name });
  if (!ach) return;

  const wasCompleted = ach.completed;

  ach.progress += increment;
  if (ach.progress >= ach.total) {
    ach.progress = ach.total;
    ach.completed = true;
  }

  ach.updatedAt = new Date();
  await ach.save();

  if (!wasCompleted && ach.completed) {
    // Reward XP for completed achievements (e.g., from quest acceptance)
    const user = await User.findById(userId);
    const xpForAchievement = 50;
    user.totalXP = (user.totalXP || 0) + xpForAchievement;
    await user.save();
  }
}
