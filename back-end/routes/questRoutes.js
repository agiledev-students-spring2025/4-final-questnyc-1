import express from 'express';
import Quest from '../models/Quest.js';

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
    const quest = await Quest.findById(req.params.questId);
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    
    // In a real implementation, you would also create a UserQuestProgress record here
    // For now, we're just returning the quest
    
    res.json({ message: `Quest ${req.params.questId} accepted`, quest });
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept quest', error: error.message });
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