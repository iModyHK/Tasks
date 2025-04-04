
const express = require('express');
const fs = require('fs');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');

router.post('/backup', authMiddleware, async (req, res) => {
  const tasks = await getAllTasks();
  fs.writeFileSync('./backup/tasks_backup.json', JSON.stringify(tasks));
  res.json({ success: true, message: 'Backup created' });
});

router.post('/restore', authMiddleware, (req, res) => {
  const data = fs.readFileSync('./backup/tasks_backup.json', 'utf8');
  restoreTasks(JSON.parse(data));
  res.json({ success: true, message: 'Backup restored' });
});

module.exports = router;
