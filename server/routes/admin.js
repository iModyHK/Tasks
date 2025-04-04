
const express = require('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middlewares/auth');

let users = [
  { id: 1, name: "Admin User", role: "admin" },
  { id: 2, name: "Team Leader", role: "team_leader" },
  { id: 3, name: "Member User", role: "member" }
];

router.get('/users', authMiddleware, isAdmin, (req, res) => {
  res.json(users);
});

router.post('/update-role', authMiddleware, isAdmin, (req, res) => {
  const { userId, role } = req.body;
  const user = users.find(u => u.id === userId);
  if (user) {
    user.role = role;
    res.json({ success: true, message: "User role updated" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

module.exports = router;
