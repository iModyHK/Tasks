
const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middlewares/auth');

let tasks = [];

router.post('/recurring', authMiddleware, roleMiddleware(['admin', 'leader']), (req, res) => {
  const { title, description, status, repeatInterval } = req.body;
  const newTask = {
    id: Date.now(),
    title,
    description,
    status: status || 'todo',
    repeatInterval, // daily, weekly, monthly
    nextOccurrence: new Date().toISOString().split('T')[0]
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

module.exports = router;
