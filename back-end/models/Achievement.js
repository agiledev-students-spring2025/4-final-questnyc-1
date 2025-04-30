import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema({
  name: String,
  description: String,
  total: Number,
  type: { type: String, enum: ['daily', 'weekly', 'streak', 'custom'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Achievement', achievementSchema);
