import express from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import PasswordReset from '../models/PasswordReset.js';

const router = express.Router();

// Registration Endpoint
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirmPass } = req.body;
        if (password !== confirmPass) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existing = await User.findOne({ $or: [{ username }, { email }] });
        if (existing) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

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
        const { email, confirmEmail } = req.body;
        if (email !== confirmEmail) {
            return res.status(400).json({ message: 'Emails do not match' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email not found' });

        const resetToken = crypto.randomBytes(32).toString('hex');
        await PasswordReset.create({ userId: user._id, resetToken });

        res.status(200).json({ message: 'Password reset link has been sent to your email address', token: resetToken });
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
      const user = await User.findOne({username: req.params.username}).select('-password');
      if (user) {
        res.json({exists: true, user});
      } else {
        res.json({exists: false});
      }
    } catch (err) {
      res.status(500).json({message: err.message});
    }
  });

export default router;
