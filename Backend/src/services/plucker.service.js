const Plucker = require('../models/Plucker');

/**
 * Get all pluckers with optional sorting
 * @param {Object} sortOptions - Sorting options
 * @returns {Array} - Array of pluckers
 */
exports.getAllPluckers = async (sortOptions = { name: 1 }) => {
  return await Plucker.find().sort(sortOptions);
};

/**
 * Get a plucker by ID
 * @param {String} id - Plucker ID
 * @returns {Object} - Plucker object
 */
exports.getPluckerById = async (id) => {
  return await Plucker.findById(id);
};

/**
 * Create a new plucker
 * @param {Object} pluckerData - Plucker data
 * @returns {Object} - Created plucker object
 */
exports.createPlucker = async (pluckerData) => {
  const newPlucker = new Plucker({
    name: pluckerData.name,
    phone: pluckerData.phone,
    address: pluckerData.address || '',
    joinDate: pluckerData.joinDate || Date.now(),
    status: pluckerData.status || 'active',
    collection: pluckerData.collection || 0
  });
  
  return await newPlucker.save();
};

/**
 * Update a plucker
 * @param {String} id - Plucker ID
 * @param {Object} pluckerData - Updated plucker data
 * @returns {Object} - Updated plucker object
 */
exports.updatePlucker = async (id, pluckerData) => {
  const pluckerFields = {};
  if (pluckerData.name) pluckerFields.name = pluckerData.name;
  if (pluckerData.phone) pluckerFields.phone = pluckerData.phone;
  if (pluckerData.address !== undefined) pluckerFields.address = pluckerData.address;
  if (pluckerData.joinDate) pluckerFields.joinDate = pluckerData.joinDate;
  if (pluckerData.status) pluckerFields.status = pluckerData.status;
  if (pluckerData.collection !== undefined) pluckerFields.collection = pluckerData.collection;
  
  return await Plucker.findByIdAndUpdate(
    id,
    { $set: pluckerFields },
    { new: true }
  );
};

/**
 * Delete a plucker
 * @param {String} id - Plucker ID
 * @returns {Boolean} - True if deleted
 */
exports.deletePlucker = async (id) => {
  const plucker = await Plucker.findById(id);
  if (!plucker) return false;
  
  await plucker.deleteOne();
  return true;
};

/**
 * Get top pluckers by collection amount
 * @param {Number} limit - Maximum number of pluckers to return
 * @returns {Array} - Array of top pluckers
 */
exports.getTopPluckers = async (limit = 5) => {
  return await Plucker.find({ status: 'active' })
    .sort({ collection: -1 })
    .limit(limit);
};