const Record = require('../models/Record');
const Plucker = require('../models/Plucker');
const Payment = require('../models/Payment');
const reportService = require('../services/report.service');
const path = require('path');

// Create placeholder functions
exports.getCollectionReport = async (req, res) => {
  try {
    res.json({
      message: 'Collection report placeholder',
      data: []
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPaymentReport = async (req, res) => {
  try {
    res.json({
      message: 'Payment report placeholder',
      data: []
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDailyReport = async (req, res) => {
  try {
    res.json({
      message: 'Daily report placeholder',
      data: []
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/reports/dashboard-stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    // Get the current month
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    // Get previous month for comparison
    const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    
    // Get records for current month
    const records = await Record.find({
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });
    
    // Get records for previous month
    const prevMonthRecords = await Record.find({
      date: { $gte: startOfPrevMonth, $lte: endOfPrevMonth }
    });
    
    // Get active pluckers count
    const activePluckers = await Plucker.countDocuments({ status: 'active' });
    const prevMonthActivePluckers = await Plucker.countDocuments({
      status: 'active',
      createdAt: { $lt: startOfMonth }
    });
    
    // Get payments for current month
    const payments = await Payment.find({
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });
    
    // Get payments for previous month
    const prevMonthPayments = await Payment.find({
      date: { $gte: startOfPrevMonth, $lte: endOfPrevMonth }
    });
    
    // Calculate metrics
    const totalCollection = records.reduce((sum, record) => sum + record.totalWeight, 0);
    const prevTotalCollection = prevMonthRecords.reduce((sum, record) => sum + record.totalWeight, 0);
    
    const totalPayments = payments.reduce((sum, payment) => sum + payment.totalAmount, 0);
    const prevTotalPayments = prevMonthPayments.reduce((sum, payment) => sum + payment.totalAmount, 0);
    
    // Calculate trends
    const collectionTrend = prevTotalCollection === 0 ? 0 :
      Math.round(((totalCollection - prevTotalCollection) / prevTotalCollection) * 100);
      
    const pluckersTrend = prevMonthActivePluckers === 0 ? 0 :
      Math.round(((activePluckers - prevMonthActivePluckers) / prevMonthActivePluckers) * 100);
      
    const paymentsTrend = prevTotalPayments === 0 ? 0 :
      Math.round(((totalPayments - prevTotalPayments) / prevTotalPayments) * 100);
    
    const stats = {
      totalCollection: Math.round(totalCollection),
      activePluckers,
      collectionDays: records.length,
      totalPayments: Math.round(totalPayments),
      collectionTrend,
      pluckersTrend,
      paymentsTrend
    };
    
    res.json({ stats });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Generate plucker report
// @route   GET /api/reports/plucker-report
// @access  Private
exports.generatePluckerReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }
    const report = await reportService.generatePluckerReport(
      new Date(startDate), 
      new Date(endDate)
    );

    // Send the PDF file directly
    const filePath = path.join(__dirname, '..', 'uploads', report.fileName);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${report.fileName}"`);
    return res.sendFile(filePath);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Error generating report' });
  }
};