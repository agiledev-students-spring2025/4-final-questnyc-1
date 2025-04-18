import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Registration: save the user _and_ their plaintext password
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirmPass } = req.body;
        if (password !== confirmPass) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Check for duplicates
        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Save user with plaintext password
        const newUser = new User({ username, email, password });
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Login: just compare the plaintext password
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Plaintext comparison
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Success
        return res.status(200).json({ message: 'Logged in successfully', user });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;
