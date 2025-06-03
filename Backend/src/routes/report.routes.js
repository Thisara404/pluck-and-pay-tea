const express = require('express');
const router = express.Router();
const { getCollectionReport, getPaymentReport, getDailyReport, getDashboardStats, generatePluckerReport } = require('../controllers/report.controller');
const auth = require('../middleware/auth');

// Routes
router.get('/collection', auth, getCollectionReport);
router.get('/payment', auth, getPaymentReport);
router.get('/daily', auth, getDailyReport);
router.get('/dashboard-stats', auth, getDashboardStats);  // Add this new route
router.get('/pluckers', auth, generatePluckerReport);

// Export the router directly
module.exports = router;