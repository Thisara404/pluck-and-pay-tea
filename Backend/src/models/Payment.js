// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  period: {
    type: String,
    required: true
  },
  startDate: Date,
  endDate: Date,
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  pluckerCount: Number,
  totalAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  details: [{
    plucker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plucker'
    },
    amount: Number,
    records: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Record'
    }]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);