// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: 'https://picsum.photos/seed/selfie/100' },
    firstJoined: { type: Date, default: Date.now },
    
    // Add quest-related fields
    totalXP: { type: Number, default: 0 },
    currentQuests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserQuestProgress'
    }],
    completedQuests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserQuestProgress'
    }]
});

const User = mongoose.model('User', userSchema);

export default User;