// models/Plucker.js
const mongoose = require('mongoose');

const PluckerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: ''
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  collection: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Plucker', PluckerSchema);