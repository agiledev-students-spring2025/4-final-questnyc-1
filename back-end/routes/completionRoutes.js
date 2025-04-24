import express from 'express';
import Quest from '../models/Quest.js';
import QuestCompletionLog from '../models/QuestCompletionLog.js';
import { updateAchievement } from '../helpers/achievementUtils.js';
import mongoose from 'mongoose';
import moment from 'moment';

const router = express.Router();

router.post('/complete', async (req, res) => {
  const { userId, questId } = req.body;

  try {
    const quest = await Quest.findById(questId);
    if (!quest) return res.status(404).json({ message: 'Quest not found' });

    // 1. Log the completion
    await QuestCompletionLog.create({ userId, questId });

    // 2. Update basic achievements
    // await updateAchievement(userId, 'First Quest Accepted');
    // await updateAchievement(userId, 'Accepted Quests');
    await updateAchievement(userId, 'First Quest Completed');
    await updateAchievement(userId, 'Completed Quests', 1);

    // 3. Theme-specific
    if (quest.theme === 'Hidden Art') {
      await updateAchievement(userId, 'Street Art Seeker');
    }

    // 4. Difficulty
    if (quest.difficulty === 'hard') {
      await updateAchievement(userId, 'Hard Mode Champ');
    }

    // 5. XP-based
    if (quest.rewardXP >= 500) {
      await updateAchievement(userId, 'High Roller XP');
    }

    // 6. Daily quest check
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    const countToday = await QuestCompletionLog.countDocuments({
      userId,
      completedAt: { $gte: todayStart, $lte: todayEnd }
    });

    if (countToday === 3) {
      await updateAchievement(userId, 'Daily Quests');
    }

    // 7. Weekly quest check
    const weekStart = moment().startOf('week').toDate();
    const weekEnd = moment().endOf('week').toDate();

    const countWeek = await QuestCompletionLog.countDocuments({
      userId,
      completedAt: { $gte: weekStart, $lte: weekEnd }
    });

    if (countWeek === 7) {
      await updateAchievement(userId, 'Weekly Warrior');
    }

    res.json({ message: 'Quest completion logged and achievements updated.' });
  } catch (err) {
    console.error('Error in quest completion route:', err);
    res.status(500).json({ message: 'Failed to process quest completion', error: err.message });
  }
});

export default router;
