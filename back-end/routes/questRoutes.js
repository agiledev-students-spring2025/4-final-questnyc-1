import express from 'express';
import Quest from '../models/Quest.js';
import User from '../models/User.js';
import UserQuestProgress from '../models/UserQuestProgress.js';

const router = express.Router();

// Get all quests
router.get('/', async (req, res) => {
  try {
    const quests = await Quest.find({ isActive: true });
    res.json(quests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quests', error: error.message });
  }
});

// Get a single quest by ID
router.get('/:questId', async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.questId);
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.json(quest);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quest', error: error.message });
  }
});

// Accept a quest (creates a progress record)
router.post('/:questId/accept', async (req, res) => {
  try {
    const { userId } = req.body; // Get from auth middleware
    const quest = await Quest.findById(req.params.questId);
    
    // Create UserQuestProgress record
    const questProgress = new UserQuestProgress({
      userId,
      questId: quest._id,
      checkpointProgress: quest.checkpoints.map(checkpoint => ({
        checkpointId: checkpoint._id,
        completed: false,
        attempts: 0
      }))
    });
    
    await questProgress.save();
    
    // Update user's currentQuests
    await User.findByIdAndUpdate(userId, {
      $push: { currentQuests: questProgress._id }
    });
    
    res.json({ message: 'Quest accepted', quest, progress: questProgress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept quest', error: error.message });
  }
});

router.post('/:questId/complete', async (req, res) => {
  try {
    const { userId } = req.body;
    const questProgress = await UserQuestProgress.findOne({ userId, questId: req.params.questId });
    
    if (!questProgress) {
      return res.status(404).json({ message: 'Quest progress not found' });
    }
    
    // Update progress
    questProgress.isCompleted = true;
    questProgress.completedAt = new Date();
    await questProgress.save();
    
    // Update user record
    await User.findByIdAndUpdate(userId, {
      $pull: { currentQuests: questProgress._id },
      $push: { completedQuests: questProgress._id },
      $inc: { totalXP: questProgress.xpEarned }
    });
    
    res.json({ message: 'Quest completed', progress: questProgress });
  } catch (error) {
    res.status(500).json({ message: 'Failed to complete quest', error: error.message });
  }
});

// Search for quests by theme
router.get('/theme/:themeName', async (req, res) => {
  try {
    const quests = await Quest.find({ 
      theme: req.params.themeName,
      isActive: true 
    });
    res.json(quests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quests by theme', error: error.message });
  }
});

// Find nearby quests (using geospatial query)
router.get('/nearby', async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5000 } = req.query; // maxDistance in meters
    
    if (!longitude || !latitude) {
      return res.status(400).json({ message: 'Longitude and latitude are required' });
    }
    
    const quests = await Quest.find({
      startLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      },
      isActive: true
    });
    
    res.json(quests);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch nearby quests', error: error.message });
  }
});

export default router;