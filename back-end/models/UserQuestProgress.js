// models/UserQuestProgress.js
import mongoose from 'mongoose';

const checkpointProgressSchema = new mongoose.Schema({
  checkpointId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  attempts: {
    type: Number,
    default: 0
  }
});

const userQuestProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quest',
    required: true
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: Date,
  isCompleted: {
    type: Boolean,
    default: false
  },
  checkpointProgress: [checkpointProgressSchema],
  currentCheckpoint: {
    type: mongoose.Schema.Types.ObjectId
  },
  xpEarned: {
    type: Number,
    default: 0
  },
  itemsCollected: [String]
}, { timestamps: true });

// Create a compound index to ensure a user only has one progress record per quest
userQuestProgressSchema.index({ userId: 1, questId: 1 }, { unique: true });

const UserQuestProgress = mongoose.model('UserQuestProgress', userQuestProgressSchema);

export default UserQuestProgress;