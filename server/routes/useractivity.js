const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, isAdmin } = require('../middlewares/auth');

const prisma = new PrismaClient();

router.get('/activity', authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    const reports = [];

    for (let user of users) {
      const userId = user.id;

      const [taskCreated, commentCount, logs] = await Promise.all([
        prisma.task.count({ where: { createdBy: userId } }),
        prisma.comment.count({ where: { userId } }),
        prisma.auditLog.findMany({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          take: 1
        })
      ]);

      reports.push({
        user: { id: userId, name: user.name, email: user.email },
        tasksCreated: taskCreated,
        commentsMade: commentCount,
        lastActivity: logs[0] || null
      });
    }

    res.json(reports);
  } catch (err) {
    console.error('Error generating user activity report:', err);
    res.status(500).json({ message: 'Failed to generate activity report' });
  }
});

module.exports = router;