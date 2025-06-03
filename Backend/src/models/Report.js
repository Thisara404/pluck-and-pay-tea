// models/Report.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  period: String,
  type: {
    type: String,
    enum: ['collection', 'payment', 'performance'],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  fileUrl: String,
  downloads: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);