const express = require('express');
const router = express.Router();
const Friend = require('../models/Friend');

// GET all friends (for the friends list page)
router.get('/', async (req, res) => {
  try {
    const friends = await Friend.find();
    res.json(friends);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get friends' });
  }
});

// GET single friend by ID (for profile page)
router.get('/:id/profile', async (req, res) => {
  try {
    const friend = await Friend.findById(req.params.id);
    if (!friend) return res.status(404).json({ error: 'Friend not found' });
    res.json(friend);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get friend' });
  }
});

module.exports = router;
