const express = require('express');
const router = express.Router();
const { 
  getAllRecords, 
  getRecordById, 
  createRecord, 
  updateRecord, 
  deleteRecord 
} = require('../controllers/record.controller');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Routes
router.get('/', auth, getAllRecords);
router.get('/:id', auth, getRecordById);

router.post('/', [
  auth,
  [
    check('date', 'Date is required').not().isEmpty(),
    check('totalWeight', 'Weight is required and must be a number').isNumeric(),
    check('pluckerCount', 'Plucker count is required and must be a number').isNumeric(),
    check('averagePrice', 'Average price is required and must be a number').isNumeric()
  ]
], createRecord);

router.put('/:id', [
  auth,
  [
    check('totalWeight', 'Weight must be a number if provided').optional().isNumeric(),
    check('pluckerCount', 'Plucker count must be a number if provided').optional().isNumeric(),
    check('averagePrice', 'Average price must be a number if provided').optional().isNumeric()
  ]
], updateRecord);

router.delete('/:id', auth, deleteRecord);

module.exports = router;