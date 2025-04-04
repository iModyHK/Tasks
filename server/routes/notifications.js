
const express = require('express');
const router = express.Router();
const { sendEmail } = require('../services/notificationService');
const { authMiddleware } = require('../middlewares/auth');

let notifications = [];

router.post('/notify', authMiddleware, async (req, res) => {
  const { email, message } = req.body;
  notifications.push({ message, user: req.user.id });
  
  try {
    await sendEmail(email, 'Task Notification', message);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});

router.get('/', authMiddleware, (req, res) => {
  res.json(notifications.filter(n => n.user === req.user.id));
});

module.exports = router;
