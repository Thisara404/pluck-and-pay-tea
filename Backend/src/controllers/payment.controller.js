const paymentService = require('../services/payment.service');
const { validationResult } = require('express-validator');

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private
exports.getAllPayments = async (req, res) => {
  try {
    // Build filter from query params
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.startDate && req.query.endDate) {
      filter.date = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate)
      };
    }

    const payments = await paymentService.getAllPayments(filter);
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get payment by ID
// @route   GET /api/payments/:id
// @access  Private
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a payment
// @route   POST /api/payments
// @access  Private
exports.createPayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const payment = await paymentService.createPayment(req.body);
    res.status(201).json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a payment
// @route   PUT /api/payments/:id
// @access  Private
exports.updatePayment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    const updatedPayment = await paymentService.updatePayment(req.params.id, req.body);
    res.json(updatedPayment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a payment
// @route   DELETE /api/payments/:id
// @access  Private
exports.deletePayment = async (req, res) => {
  try {
    const deleted = await paymentService.deletePayment(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    res.json({ message: 'Payment removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Generate payment data for a period
// @route   POST /api/payments/generate
// @access  Private
exports.generatePaymentData = async (req, res) => {
  try {
    if (!req.body.startDate || !req.body.endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }
    
    const startDate = new Date(req.body.startDate);
    const endDate = new Date(req.body.endDate);
    
    const paymentData = await paymentService.generatePaymentData(startDate, endDate);
    res.json(paymentData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Complete a payment
// @route   PUT /api/payments/:id/complete
// @access  Private
exports.completePayment = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentById(req.params.id);
    
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    if (payment.status === 'completed') {
      return res.status(400).json({ message: 'Payment already completed' });
    }
    
    const completedPayment = await paymentService.completePayment(req.params.id);
    res.json(completedPayment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get payments by plucker
// @route   GET /api/payments/plucker/:id
// @access  Private
exports.getPaymentsByPlucker = async (req, res) => {
  try {
    const payments = await paymentService.getPaymentsByPlucker(req.params.id);
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Plucker not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};