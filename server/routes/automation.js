const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware, isAdmin } = require('../middlewares/auth');

const prisma = new PrismaClient();

// List all automations
router.get('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const automations = await prisma.automation.findMany();
    res.json(automations);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching automations' });
  }
});

// Create new automation
router.post('/', authMiddleware, isAdmin, async (req, res) => {
  try {
    const automation = await prisma.automation.create({
      data: req.body
    });
    res.status(201).json(automation);
  } catch (err) {
    res.status(500).json({ message: 'Error creating automation' });
  }
});

module.exports = router;