const recordService = require('../services/record.service');
const pluckerService = require('../services/plucker.service');
const { validationResult } = require('express-validator');

// @desc    Get all records
// @route   GET /api/records
// @access  Private
exports.getAllRecords = async (req, res) => {
  try {
    const records = await recordService.getAllRecords();
    res.json(records);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get record by ID
// @route   GET /api/records/:id
// @access  Private
exports.getRecordById = async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id);
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    res.json(record);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a record
// @route   POST /api/records
// @access  Private
exports.createRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { date, totalWeight, pluckerCount, averagePrice, pluckerDetails } = req.body;

    // Create the record
    const record = await recordService.createRecord({
      date, 
      totalWeight, 
      pluckerCount, 
      averagePrice,
      pluckerDetails
    });

    // Update plucker collection amounts
    if (pluckerDetails && pluckerDetails.length > 0) {
      for (const detail of pluckerDetails) {
        const plucker = await pluckerService.getPluckerById(detail.pluckerId);
        if (plucker) {
          // Update the plucker's collection total
          const updatedCollection = plucker.collection + detail.weight;
          await pluckerService.updatePlucker(detail.pluckerId, {
            collection: updatedCollection
          });
        }
      }
    }
    
    res.status(201).json(record);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a record
// @route   PUT /api/records/:id
// @access  Private
exports.updateRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const record = await recordService.getRecordById(req.params.id);
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    const updatedRecord = await recordService.updateRecord(req.params.id, req.body);
    res.json(updatedRecord);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a record
// @route   DELETE /api/records/:id
// @access  Private
exports.deleteRecord = async (req, res) => {
  try {
    const record = await recordService.getRecordById(req.params.id);
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // If the record has plucker details, subtract those weights from the pluckers' collections
    if (record.pluckerDetails && record.pluckerDetails.length > 0) {
      for (const detail of record.pluckerDetails) {
        const plucker = await pluckerService.getPluckerById(detail.pluckerId);
        if (plucker) {
          const updatedCollection = Math.max(0, plucker.collection - detail.weight);
          await pluckerService.updatePlucker(detail.pluckerId, {
            collection: updatedCollection
          });
        }
      }
    }
    
    const deleted = await recordService.deleteRecord(req.params.id);
    
    res.json({ message: 'Record removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};