const express = require('express');
const router = express.Router();
const { 
  getAllPayments, 
  getPaymentById, 
  createPayment, 
  updatePayment, 
  deletePayment,
  generatePaymentData,
  completePayment,
  getPaymentsByPlucker
} = require('../controllers/payment.controller');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// Generate payment data for a period
router.post('/generate', auth, generatePaymentData);

// Complete a payment
router.put('/:id/complete', auth, completePayment);

// Get payments by plucker
router.get('/plucker/:id', auth, getPaymentsByPlucker);

// Standard CRUD routes
router.get('/', auth, getAllPayments);
router.get('/:id', auth, getPaymentById);
router.post('/', [
  auth,
  [
    check('period', 'Period is required').not().isEmpty(),
    check('totalAmount', 'Total amount is required and must be a number').isNumeric(),
    check('details', 'Details are required').isArray({ min: 1 })
  ]
], createPayment);
router.put('/:id', [
  auth,
  [
    check('totalAmount', 'Total amount must be a number if provided').optional().isNumeric()
  ]
], updatePayment);
router.delete('/:id', auth, deletePayment);

module.exports = router;