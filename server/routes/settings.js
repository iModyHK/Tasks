const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { roleMiddleware } = require('../middlewares/auth');

router.get('/', async (req, res) => {
  const settings = await prisma.settings.findFirst();
  res.json(settings);
});

router.post('/', roleMiddleware(['admin']), async (req, res) => {
  let settings = await prisma.settings.findFirst();
  if (!settings) {
    settings = await prisma.settings.create({ data: req.body });
  } else {
    settings = await prisma.settings.update({
      where: { id: settings.id },
      data: req.body
    });
  }
  res.json(settings);
});

module.exports = router;