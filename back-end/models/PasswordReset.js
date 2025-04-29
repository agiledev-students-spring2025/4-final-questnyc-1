import mongoose from 'mongoose';

const passwordResetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resetToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 } // expires in 1 hour
});

export default mongoose.model('PasswordReset', passwordResetSchema);