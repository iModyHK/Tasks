const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middlewares/auth');

const prisma = new PrismaClient();

// Get logs by task or user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { taskId, userId } = req.query;
    const logs = await prisma.timeLog.findMany({
      where: {
        ...(taskId && { taskId: parseInt(taskId) }),
        ...(userId && { userId: parseInt(userId) }),
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(logs);
  } catch (err) {
    console.error('Error fetching logs:', err);
    res.status(500).json({ message: 'Failed to fetch logs' });
  }
});

// Create time log
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { taskId, startTime, endTime, durationMinutes, note } = req.body;

    const timeLog = await prisma.timeLog.create({
      data: {
        taskId,
        userId: req.user.id,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        durationMinutes,
        note,
      },
    });

    res.status(201).json(timeLog);
  } catch (err) {
    console.error('Error creating log:', err);
    res.status(500).json({ message: 'Failed to create log' });
  }
});

module.exports = router;