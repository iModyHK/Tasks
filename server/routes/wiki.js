const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authMiddleware } = require('../middlewares/auth');

const prisma = new PrismaClient();

// Get wiki by project
router.get('/:projectId', authMiddleware, async (req, res) => {
  try {
    const wiki = await prisma.wiki.findUnique({
      where: { projectId: parseInt(req.params.projectId) }
    });
    res.json(wiki);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wiki' });
  }
});

// Create or update wiki
router.post('/:projectId', authMiddleware, async (req, res) => {
  try {
    const projectId = parseInt(req.params.projectId);
    const existing = await prisma.wiki.findUnique({ where: { projectId } });

    let wiki;
    if (existing) {
      wiki = await prisma.wiki.update({
        where: { projectId },
        data: {
          content: req.body.content,
          updatedBy: req.user.id
        }
      });
    } else {
      wiki = await prisma.wiki.create({
        data: {
          projectId,
          content: req.body.content,
          updatedBy: req.user.id
        }
      });
    }

    res.json(wiki);
  } catch (err) {
    res.status(500).json({ message: 'Error saving wiki' });
  }
});

module.exports = router;