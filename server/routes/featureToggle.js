
const express = require('express');
const router = express.Router();
const FeatureToggle = require('../models/featureToggle');
const { authMiddleware, isAdmin } = require('../middlewares/auth');

// Get all features
router.get('/', authMiddleware, isAdmin, async (req, res) => {
  const toggles = await FeatureToggle.find();
  res.json(toggles);
});

// Update or create feature
router.post('/', authMiddleware, isAdmin, async (req, res) => {
  const { key, enabled } = req.body;
  let toggle = await FeatureToggle.findOne({ key });
  if (toggle) {
    toggle.enabled = enabled;
    await toggle.save();
  } else {
    toggle = await FeatureToggle.create({ key, enabled });
  }
  res.json(toggle);
});

module.exports = router;
