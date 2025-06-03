const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const pluckerRoutes = require('./plucker.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/pluckers', pluckerRoutes);

// Default route to test API
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Pluck and Pay Tea API' });
});

module.exports = router;