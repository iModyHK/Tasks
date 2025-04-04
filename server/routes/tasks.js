const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middlewares/auth');

const prisma = new PrismaClient();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const userRole = req.user.role;

    const tasks = await prisma.task.findMany({
      where: userRole === 'admin' ? {} : { private: false },
    });

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

module.exports = router;