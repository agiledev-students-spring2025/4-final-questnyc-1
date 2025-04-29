// routes/friendRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Add a friend by username
router.post('/add', async (req, res) => {
  try {
    const { userId, friendUsername } = req.body;
    
    // Find the current user
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Find the friend by username
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      return res.status(404).json({ message: 'Friend not found' });
    }
    
    // Check if already friends
    const alreadyFriends = currentUser.friends.some(f => 
      f.userId.toString() === friend._id.toString()
    );
    
    if (alreadyFriends) {
      return res.status(400).json({ message: 'Already friends with this user' });
    }
    
    // Add friend to user's friends list
    currentUser.friends.push({
      userId: friend._id,
      username: friend.username
    });
    
    await currentUser.save();
    
    res.status(200).json({ 
      message: 'Friend added successfully',
      friend: {
        userId: friend._id,
        username: friend.username
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to add friend', 
      error: error.message 
    });
  }
});

// Get user's friends list
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to fetch friends list', 
      error: error.message 
    });
  }
});

// Remove a friend
router.delete('/:userId/remove/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    
    const result = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: { userId: friendId } } },
      { new: true }
    );
    
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      message: 'Friend removed successfully',
      updatedFriendsList: result.friends
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Failed to remove friend', 
      error: error.message 
    });
  }
});

export default router;