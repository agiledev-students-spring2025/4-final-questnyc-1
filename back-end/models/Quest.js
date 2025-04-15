// models/Quest.js
import mongoose from 'mongoose';

const checkpointSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  hints: [String],
  trivia: String,
  challengeType: {
    type: String,
    enum: ['quiz', 'photo', 'scan', 'riddle', 'none'],
    default: 'none'
  },
  challengeData: mongoose.Schema.Types.Mixed, // For storing quiz questions, etc.
  order: {
    type: Number,
    required: true
  }
});

const questSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  theme: {
    type: String,
    enum: ['Historic NYC', 'Hidden Art', 'Foodie Hunt', 'Ghost Stories', 'Nature', 'Architecture', 'Cultural'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  estimatedTime: {
    type: Number, // in minutes
    required: true
  },
  distance: {
    type: Number, // in kilometers
    required: true
  },
  startLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  checkpoints: [checkpointSchema],
  rewardXP: {
    type: Number,
    required: true,
    default: 100
  },
  rewardItems: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  imageUrl: String,
  completionCriteria: {
    type: String,
    enum: ['all-checkpoints', 'min-checkpoints', 'specific-checkpoint'],
    default: 'all-checkpoints'
  },
  minCheckpointsRequired: Number,
  isVerified: {
    type: Boolean,
    default: false
  },
  generatedBy: {
    type: String,
    enum: ['AI', 'admin', 'user'],
    default: 'AI'
  }
}, { timestamps: true });

// Add index for geospatial queries
questSchema.index({ startLocation: '2dsphere' });
checkpointSchema.index({ location: '2dsphere' });

const Quest = mongoose.model('Quest', questSchema);

export default Quest;