import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: 'https://picsum.photos/seed/selfie/100' },
    firstJoined: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
