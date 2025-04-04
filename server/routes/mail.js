
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/send', authMiddleware, (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.toString() });
    }
    res.json({ success: true, message: "Email sent", info });
  });
});

module.exports = router;
