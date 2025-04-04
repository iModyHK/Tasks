const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { PrismaClient } = require('@prisma/client');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const prisma = new PrismaClient();

router.get('/report', authMiddleware, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { assignedToId: req.user.id },
      select: {
        id: true,
        title: true,
        status: true,
        dueDate: true
      }
    });

    const fields = ['id', 'title', 'status', 'dueDate'];
    const parser = new Parser({ fields });
    const csv = parser.parse(tasks);

    const filePath = path.join(__dirname, '..', '..', 'reports', `task_report_${req.user.id}.csv`);
    fs.writeFileSync(filePath, csv);

    res.download(filePath);
  } catch (err) {
    console.error('Error generating report:', err);
    res.status(500).json({ message: 'Failed to generate report' });
  }
});

module.exports = router;