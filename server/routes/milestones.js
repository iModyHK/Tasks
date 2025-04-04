const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middlewares/auth');

const prisma = new PrismaClient();

const milestones = [
  { id: 1, title: 'First Task Completed', condition: 1, badge: 'Beginner' },
  { id: 2, title: '10 Tasks Completed', condition: 10, badge: 'Task Master' },
  { id: 3, title: 'Completed a Project', condition: 'project', badge: 'Project Finisher' }
];

router.get('/', authMiddleware, async (req, res) => {
  try {
    const completedTasks = await prisma.task.count({
      where: { assignedToId: req.user.id, status: 'completed' }
    });

    const earned = milestones.filter(m => 
      typeof m.condition === 'number' ? completedTasks >= m.condition : false
    );

    res.json({ completedTasks, achievements: earned });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch milestones' });
  }
});

module.exports = router;