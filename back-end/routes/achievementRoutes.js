// routes/achievementRoutes.js
import express from 'express';
import Achievement from '../models/Achievement.js';
const router = express.Router();

// Get all achievements for a user
router.get('/:userId', async (req, res) => {
  try {
    const achievements = await Achievement.find({ userId: req.params.userId });
    res.json(achievements);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load achievements', error: err.message });
  }
});

// Update progress
router.post('/update', async (req, res) => {
  const { userId, name, increment } = req.body;
  try {
    const ach = await Achievement.findOne({ userId, name });
    if (!ach) return res.status(404).json({ message: 'Achievement not found' });

    ach.progress += increment;
    if (ach.progress >= ach.total) {
      ach.completed = true;
      ach.progress = ach.total;
    }
    ach.updatedAt = Date.now();
    await ach.save();
    res.json(ach);
  } catch (err) {
    res.status(500).json({ message: 'Error updating achievement', error: err.message });
  }
});

export default router;
