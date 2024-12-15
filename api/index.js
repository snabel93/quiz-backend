const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Score = require('../models/Score');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'https://xmas-quiz-opal.vercel.app/']
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
    try {
        const scores = await Score.find()
            .sort({ score: -1, timestamp: 1 }) // Sort by score desc, then by time asc
            .limit(10);
        res.json(scores);
    } catch (err) {
        console.error('Leaderboard error:', err);
        res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
});

// Add new score
app.post('/api/score', async (req, res) => {
    try {
        const score = new Score({
            name: req.body.name,
            score: req.body.score
        });

        const newScore = await score.save();
        res.status(201).json(newScore);
    } catch (err) {
        console.error('Score saving error:', err);
        res.status(400).json({ message: 'Failed to save score' });
    }
});

// Vercel requires this
module.exports = app;