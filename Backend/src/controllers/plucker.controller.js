const pluckerService = require('../services/plucker.service');
const { validationResult } = require('express-validator');

// @desc    Get all pluckers
// @route   GET /api/pluckers
// @access  Private
exports.getAllPluckers = async (req, res) => {
  try {
    const pluckers = await pluckerService.getAllPluckers();
    res.json(pluckers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get plucker by ID
// @route   GET /api/pluckers/:id
// @access  Private
exports.getPluckerById = async (req, res) => {
  try {
    const plucker = await pluckerService.getPluckerById(req.params.id);
    
    if (!plucker) {
      return res.status(404).json({ message: 'Plucker not found' });
    }
    
    res.json(plucker);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Plucker not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a plucker
// @route   POST /api/pluckers
// @access  Private
exports.createPlucker = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const plucker = await pluckerService.createPlucker(req.body);
    res.status(201).json(plucker);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a plucker
// @route   PUT /api/pluckers/:id
// @access  Private
exports.updatePlucker = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const plucker = await pluckerService.getPluckerById(req.params.id);
    
    if (!plucker) {
      return res.status(404).json({ message: 'Plucker not found' });
    }
    
    const updatedPlucker = await pluckerService.updatePlucker(req.params.id, req.body);
    res.json(updatedPlucker);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Plucker not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a plucker
// @route   DELETE /api/pluckers/:id
// @access  Private
exports.deletePlucker = async (req, res) => {
  try {
    const deleted = await pluckerService.deletePlucker(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: 'Plucker not found' });
    }
    
    res.json({ message: 'Plucker removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Plucker not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get top performing pluckers
// @route   GET /api/pluckers/top
// @access  Private
exports.getTopPluckers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const pluckers = await pluckerService.getTopPluckers(limit);
    res.json(pluckers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};