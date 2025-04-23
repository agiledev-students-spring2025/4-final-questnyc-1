import express from 'express';
import User from '../models/User.js';
import UserQuestProgress from '../models/UserQuestProgress.js';

const router = express.Router();

router.get('/user/:userId/quests/current', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate({
        path: 'currentQuests',
        populate: { path: 'questId' }
      });

    res.json(user.currentQuests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch current quests', error: error.message });
  }
});


router.get('/user/:userId/quests/completed', async (req, res) => {
  try {
    const completed = await UserQuestProgress.find({
      userId: req.params.userId,
      isCompleted: true
    }).populate('questId'); // populate full quest info

    res.json(completed);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch completed quests', error: error.message });
  }
});

export default router;
