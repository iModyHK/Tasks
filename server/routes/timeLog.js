const express = require('express');
const router = express.Router();
const TimeLog = require('../models/TimeLog');
const authMiddleware = require('../middlewares/auth');

// Get all time logs for a user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const logs = await TimeLog.find({ user: req.user.id });
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a new time log
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { task, duration, notes } = req.body;
        const newLog = new TimeLog({ user: req.user.id, task, duration, notes });
        await newLog.save();
        res.status(201).json(newLog);
    } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

module.exports = router;
