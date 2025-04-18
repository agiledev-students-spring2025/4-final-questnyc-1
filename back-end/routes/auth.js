// routes/auth.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /api/register
 * Body: { username, password, confirmPass }
 */
router.post('/register', async (req, res) => {
    const { username, password, confirmPass } = req.body;
    if (!username || !password || !confirmPass) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    if (password !== confirmPass) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({ message: 'Username already taken.' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully.' });
    } catch (err) {
        console.error('Registration error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

/**
 * POST /api/login
 * Body: { username, password }
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        return res.status(200).json({
            message: 'Login successful.',
            user: { username: user.username }
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

/**
 * POST /api/password-reset-request
 * Body: { username, confirmUsername }
 */
router.post('/password-reset-request', async (req, res) => {
    const { username, confirmUsername } = req.body;
    if (!username || !confirmUsername) {
        return res.status(400).json({ message: 'Both fields are required.' });
    }
    if (username !== confirmUsername) {
        return res.status(400).json({ message: 'Usernames do not match.' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        // In a real app you'd email a token here; we just confirm the step
        return res.status(200).json({ message: 'Password reset request recorded.' });
    } catch (err) {
        console.error('Password reset request error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

/**
 * POST /api/password-reset-confirmation
 * Body: { username, newPassword, confirmNewPassword }
 */
router.post('/password-reset-confirmation', async (req, res) => {
    const { username, newPassword, confirmNewPassword } = req.body;
    if (!username || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({ message: 'Password reset successfully.' });
    } catch (err) {
        console.error('Password reset confirmation error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;
