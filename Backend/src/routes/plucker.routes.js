// routes/plucker.routes.js
const express = require('express');
const router = express.Router();
const { getAllPluckers, getPluckerById, createPlucker, updatePlucker, deletePlucker } = require('../controllers/plucker.controller');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Routes
router.get('/', auth, getAllPluckers);
router.get('/:id', auth, getPluckerById);
router.post('/', [
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty()
  ]
], createPlucker);
router.put('/:id', [
  auth,
  [
    check('name', 'Name is required').not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty()
  ]
], updatePlucker);
router.delete('/:id', auth, deletePlucker);

// Export the router directly
module.exports = router;