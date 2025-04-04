const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, isAdmin } = require('../middlewares/auth');

const prisma = new PrismaClient();

// Dynamic report generator
router.post('/generate', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { filters, fields } = req.body;

    const where = {};
    if (filters.status) where.status = filters.status;
    if (filters.assignedTo) where.assignedToId = filters.assignedTo;

    if (filters.createdAfter || filters.createdBefore) {
      where.createdAt = {};
      if (filters.createdAfter) where.createdAt.gte = new Date(filters.createdAfter);
      if (filters.createdBefore) where.createdAt.lte = new Date(filters.createdBefore);
    }

    const tasks = await prisma.task.findMany({
      where,
      select: fields.reduce((acc, f) => ({ ...acc, [f]: true }), {})
    });

    res.json(tasks);
  } catch (err) {
    console.error('Error generating custom report:', err);
    res.status(500).json({ message: 'Failed to generate report' });
  }
});

module.exports = router;