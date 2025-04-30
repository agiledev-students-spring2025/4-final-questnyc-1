// import express from 'express';
// import Quest from '../models/Quest.js';
// import QuestCompletionLog from '../models/QuestCompletionLog.js';
// import { updateAchievement } from '../helpers/achievementUtils.js';
// import { checkAndUpdateAchievements } from '../helpers/checkAndUpdateAchievements.js';
// import mongoose from 'mongoose';
// import moment from 'moment';

// const router = express.Router();

// router.post('/complete', async (req, res) => {
//   const { userId, questId } = req.body;

//   try {
//     const quest = await Quest.findById(questId);
//     if (!quest) return res.status(404).json({ message: 'Quest not found' });

//     await QuestCompletionLog.create({ userId, questId });

//     await updateAchievement(userId, 'First Quest Completed');
//     await updateAchievement(userId, 'Completed Quests', 1);

//     if (quest.theme === 'Hidden Art') {
//       await updateAchievement(userId, 'Street Art Seeker');
//     }

//     if (quest.theme === 'Historic NYC') {
//       await updateAchievement(userId, 'History Buff');
//     }
//     if (quest.theme === 'Ghost Stories') {
//       await updateAchievement(userId, 'Ghost Hunter');
//     }
    

//     if (quest.difficulty === 'hard') {
//       await updateAchievement(userId, 'Hard Mode Champ');
//     }

//     if (quest.rewardXP >= 500) {
//       await updateAchievement(userId, 'High Roller XP');
//     }

//     const todayStart = moment().startOf('day').toDate();
//     const todayEnd = moment().endOf('day').toDate();

//     const countToday = await QuestCompletionLog.countDocuments({
//       userId,
//       completedAt: { $gte: todayStart, $lte: todayEnd }
//     });

//     if (countToday === 3) {
//       await updateAchievement(userId, 'Daily Quests');
//     }

//     const weekStart = moment().startOf('week').toDate();
//     const weekEnd = moment().endOf('week').toDate();

//     const numQuestsCurrentWeek = await QuestCompletionLog.countDocuments({ // count how many quests were done this week
//       userId,
//       completedAt: { $gte: weekStart, $lte: weekEnd }
//     });

//     if (numQuestsCurrentWeek === 7) {
//       await updateAchievement(userId, 'Weekly Warrior');
//     }

//     res.json({ message: 'Quest completion logged and achievements updated.' });
//   } catch (err) {
//     console.error('Error in quest completion route:', err);
//     res.status(500).json({ message: 'Failed to process quest completion', error: err.message });
//   }
// });

// export default router;

// routes/completionRoutes.js
import express from 'express';
import Quest from '../models/Quest.js';
import QuestCompletionLog from '../models/QuestCompletionLog.js';
import User from '../models/User.js';
import { checkAndUpdateAchievements } from '../helpers/checkAndUpdateAchievements.js';

const router = express.Router();

router.post('/complete', async (req, res) => {
  const { userId, questId } = req.body;

  try {
    const quest = await Quest.findById(questId);
    if (!quest) return res.status(404).json({ message: 'Quest not found' });

    await QuestCompletionLog.create({ userId, questId });
    const newlyCompleted = await checkAndUpdateAchievements(userId, quest);
    const user = await User.findById(userId);

    res.json({
      message: 'Quest completion logged and achievements updated.',
      xpEarned: quest.rewardXP,
      newTotalXP: user.totalXP,
      achievementsUnlocked: newlyCompleted
    });
  } catch (err) {
    console.error('Error in quest completion route:', err);
    res.status(500).json({ message: 'Failed to process quest completion', error: err.message });
  }
});

export default router;