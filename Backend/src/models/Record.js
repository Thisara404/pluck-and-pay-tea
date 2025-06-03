// models/Record.js
const mongoose = require('mongoose');

const PluckerDetailSchema = new mongoose.Schema({
  pluckerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plucker',
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

const RecordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  totalWeight: {
    type: Number,
    required: true
  },
  pluckerCount: {
    type: Number,
    required: true
  },
  averagePrice: {
    type: Number,
    required: true
  },
  pluckerDetails: [PluckerDetailSchema]
}, { timestamps: true });

module.exports = mongoose.model('Record', RecordSchema);