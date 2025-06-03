const Payment = require('../models/Payment');
const Record = require('../models/Record');
const mongoose = require('mongoose');

/**
 * Get all payments
 * @param {Object} filter - Filter criteria
 * @param {Object} sortOptions - Sorting options
 * @returns {Array} - Array of payments
 */
exports.getAllPayments = async (filter = {}, sortOptions = { date: -1 }) => {
  return await Payment.find(filter)
    .sort(sortOptions)
    .populate('details.plucker', 'name phone')
    .populate('details.records');
};

/**
 * Get payment by ID
 * @param {String} id - Payment ID
 * @returns {Object} - Payment object
 */
exports.getPaymentById = async (id) => {
  return await Payment.findById(id)
    .populate('details.plucker', 'name phone')
    .populate('details.records');
};

/**
 * Create a new payment
 * @param {Object} paymentData - Payment data
 * @returns {Object} - Created payment object
 */
exports.createPayment = async (paymentData) => {
  const newPayment = new Payment({
    period: paymentData.period,
    startDate: paymentData.startDate,
    endDate: paymentData.endDate,
    status: paymentData.status || 'pending',
    pluckerCount: paymentData.details ? paymentData.details.length : 0,
    totalAmount: paymentData.totalAmount,
    date: paymentData.date || Date.now(),
    details: paymentData.details || []
  });
  
  return await newPayment.save();
};

/**
 * Update a payment
 * @param {String} id - Payment ID
 * @param {Object} paymentData - Updated payment data
 * @returns {Object} - Updated payment object
 */
exports.updatePayment = async (id, paymentData) => {
  const paymentFields = {};
  if (paymentData.period) paymentFields.period = paymentData.period;
  if (paymentData.startDate) paymentFields.startDate = paymentData.startDate;
  if (paymentData.endDate) paymentFields.endDate = paymentData.endDate;
  if (paymentData.status) paymentFields.status = paymentData.status;
  if (paymentData.totalAmount !== undefined) paymentFields.totalAmount = paymentData.totalAmount;
  if (paymentData.date) paymentFields.date = paymentData.date;
  
  if (paymentData.details) {
    paymentFields.details = paymentData.details;
    paymentFields.pluckerCount = paymentData.details.length;
  }
  
  return await Payment.findByIdAndUpdate(
    id,
    { $set: paymentFields },
    { new: true }
  ).populate('details.plucker', 'name phone')
    .populate('details.records');
};

/**
 * Delete a payment
 * @param {String} id - Payment ID
 * @returns {Boolean} - True if deleted
 */
exports.deletePayment = async (id) => {
  const payment = await Payment.findById(id);
  if (!payment) return false;
  
  await payment.deleteOne();
  return true;
};

/**
 * Generate payment data for a period
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Object} - Payment data
 */
exports.generatePaymentData = async (startDate, endDate) => {
  // Find all records in the date range
  const records = await Record.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('details.plucker');
  
  // Group by plucker
  const pluckerMap = new Map();
  let totalAmount = 0;
  
  records.forEach(record => {
    record.details.forEach(detail => {
      const pluckerId = detail.plucker._id.toString();
      const amount = detail.weight * record.averagePrice;
      
      if (!pluckerMap.has(pluckerId)) {
        pluckerMap.set(pluckerId, {
          plucker: detail.plucker._id,
          amount: 0,
          records: []
        });
      }
      
      const pluckerData = pluckerMap.get(pluckerId);
      pluckerData.amount += amount;
      pluckerData.records.push(record._id);
      totalAmount += amount;
    });
  });
  
  // Create payment data
  return {
    period: `${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`,
    startDate,
    endDate,
    status: 'pending',
    pluckerCount: pluckerMap.size,
    totalAmount,
    details: Array.from(pluckerMap.values())
  };
};

/**
 * Get payments by date range
 * @param {Date} startDate - Start date
 * @param {Date} endDate - End date
 * @returns {Array} - Array of payments
 */
exports.getPaymentsByDateRange = async (startDate, endDate) => {
  return await Payment.find({
    date: {
      $gte: startDate,
      $lte: endDate
    }
  }).sort({ date: -1 })
    .populate('details.plucker', 'name phone')
    .populate('details.records');
};

/**
 * Get payments by plucker
 * @param {String} pluckerId - Plucker ID
 * @returns {Array} - Array of payments
 */
exports.getPaymentsByPlucker = async (pluckerId) => {
  return await Payment.find({
    'details.plucker': pluckerId
  }).sort({ date: -1 })
    .populate('details.plucker', 'name phone')
    .populate('details.records');
};

/**
 * Complete a payment
 * @param {String} id - Payment ID
 * @returns {Object} - Updated payment object
 */
exports.completePayment = async (id) => {
  return await Payment.findByIdAndUpdate(
    id,
    { $set: { status: 'completed' } },
    { new: true }
  ).populate('details.plucker', 'name phone')
    .populate('details.records');
};