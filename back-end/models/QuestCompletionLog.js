import mongoose from 'mongoose';

const questCompletionLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quest', required: true },
  completedAt: { type: Date, default: Date.now }
});

export default mongoose.model('QuestCompletionLog', questCompletionLogSchema);
