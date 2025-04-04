const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middlewares/auth');

const prisma = new PrismaClient();

// List audit logs (admin use)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { name: true, email: true } } }
    });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching audit logs' });
  }
});

module.exports = router;