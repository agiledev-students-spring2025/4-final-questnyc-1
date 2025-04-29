import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import PasswordReset from '../models/PasswordReset.js';
import { seedAchievementsNewUser } from '../helpers/seedAchievementsNewUser.js'; // adjust if needed


const router = express.Router();

// Registration Endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, password, confirmPass, profilePic } = req.body;

        if (password !== confirmPass) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            profilePic: profilePic || 'https://picsum.photos/seed/selfie/100'
        });

        await newUser.save();
        await seedAchievementsNewUser(newUser._id);

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Login Endpoint
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

        res.status(200).json({ message: 'Logged in successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Password Reset Request Endpoint
router.post('/password-reset-request', async (req, res) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Username not found' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        await PasswordReset.create({ userId: user._id, resetToken });

        res.status(200).json({
            message: 'Password reset token created',
            token: resetToken
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Password Reset Confirmation Endpoint
router.post('/password-reset-confirmation', async (req, res) => {
    try {
        const { token, newPassword, confirmNewPassword } = req.body;
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const resetRecord = await PasswordReset.findOne({ resetToken: token });
        if (!resetRecord) return res.status(400).json({ message: 'Invalid or expired token' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(resetRecord.userId, { password: hashedPassword });
        await PasswordReset.deleteOne({ _id: resetRecord._id });

        res.status(200).json({ message: 'Password has been successfully reset' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// To access all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// To find user
router.get('/check-user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        if (user) {
            res.json({ exists: true, user });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// For all information related to this user
// In auth.js - update fullprofile endpoint
router.get('/users/:userId/fullprofile', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate({
                path: 'currentQuests',
                populate: {
                    path: 'questId',
                    model: 'Quest'
                }
            })
            .populate({
                path: 'completedQuests',
                populate: {
                    path: 'questId',
                    model: 'Quest'
                }
            })
            .lean();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const orderedUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            firstJoined: user.firstJoined,
            totalXP: user.totalXP,
            currentQuests: user.currentQuests,
            completedQuests: user.completedQuests,
            __v: user.__v
        };

        res.json(orderedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile', error: error.message });
    }
});

export default router;
