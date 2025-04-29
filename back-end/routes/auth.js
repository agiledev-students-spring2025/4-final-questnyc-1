// back-end/routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { seedAchievementsNewUser } from '../helpers/seedAchievementsNewUser.js';

const router = express.Router();

// ———————————————————————————
// Registration Endpoint
// ———————————————————————————
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirmPass } = req.body;
        if (password !== confirmPass) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        await seedAchievementsNewUser(newUser._id);

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ———————————————————————————
// Login Endpoint
// ———————————————————————————
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Logged in successfully', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ———————————————————————————
// Simple Password Reset Request
// ———————————————————————————
router.post('/password-reset-request', async (req, res) => {
    try {
        const { username, confirmUsername } = req.body;
        if (username !== confirmUsername) {
            return res.status(400).json({ message: 'Usernames do not match' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // No token sent—just confirm they can reset
        res.status(200).json({ message: 'Username confirmed. Proceed to reset your password.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ———————————————————————————
// Simple Password Reset Confirmation
// ———————————————————————————
router.post('/password-reset-confirmation', async (req, res) => {
    try {
        const { username, newPassword, confirmNewPassword } = req.body;
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.status(200).json({ message: 'Password has been successfully reset' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ———————————————————————————
// List All Users (no passwords)
// ———————————————————————————
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ———————————————————————————
// Check if a Username Exists
// ———————————————————————————
router.get('/check-user/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        res.json({ exists: !!user, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ———————————————————————————
// Get Full Profile (with quests)
// ———————————————————————————
router.get('/users/:userId/fullprofile', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate({
                path: 'currentQuests',
                populate: { path: 'questId', model: 'Quest' }
            })
            .populate({
                path: 'completedQuests',
                populate: { path: 'questId', model: 'Quest' }
            })
            .lean();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Maintain order: currentQuests first
        const ordered = {
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

        res.json(ordered);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user profile', error: err.message });
    }
});

export default router;
