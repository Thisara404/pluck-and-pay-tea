const Record = require('../models/Record');

/**
 * Get all records with optional sorting
 * @param {Object} sortOptions - Sorting options
 * @returns {Array} - Array of records
 */
exports.getAllRecords = async (sortOptions = { date: -1 }) => {
  return await Record.find().sort(sortOptions);
};

/**
 * Get a record by ID
 * @param {String} id - Record ID
 * @returns {Object} - Record object
 */
exports.getRecordById = async (id) => {
  return await Record.findById(id);
};

/**
 * Create a new record
 * @param {Object} recordData - Record data
 * @returns {Object} - Created record object
 */
exports.createRecord = async (recordData) => {
  const newRecord = new Record({
    date: recordData.date,
    totalWeight: recordData.totalWeight,
    pluckerCount: recordData.pluckerCount,
    averagePrice: recordData.averagePrice,
    pluckerDetails: recordData.pluckerDetails || []
  });
  
  return await newRecord.save();
};

/**
 * Update a record
 * @param {String} id - Record ID
 * @param {Object} recordData - Updated record data
 * @returns {Object} - Updated record object
 */
exports.updateRecord = async (id, recordData) => {
  const recordFields = {};
  if (recordData.date) recordFields.date = recordData.date;
  if (recordData.totalWeight !== undefined) recordFields.totalWeight = recordData.totalWeight;
  if (recordData.pluckerCount !== undefined) recordFields.pluckerCount = recordData.pluckerCount;
  if (recordData.averagePrice !== undefined) recordFields.averagePrice = recordData.averagePrice;
  if (recordData.pluckerDetails) recordFields.pluckerDetails = recordData.pluckerDetails;
  
  return await Record.findByIdAndUpdate(
    id,
    { $set: recordFields },
    { new: true }
  );
};

/**
 * Delete a record
 * @param {String} id - Record ID
 * @returns {Boolean} - True if deleted
 */
exports.deleteRecord = async (id) => {
  const record = await Record.findById(id);
  if (!record) return false;
  
  await record.deleteOne();
  return true;
};