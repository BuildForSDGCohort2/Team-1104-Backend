const boom = require('boom');

// Get Data Models
const Health = require('../models/Health');
// get health records by farmer id and livestock idall status
exports.getAllFarmerBrecords = async (req) => {
  try {
    const farmerid =
      req.params === undefined ? req.farmerId : req.params.farmerId;
    const livestockid =
      req.params === undefined ? req.livestockId : req.params.livestockId;
    const livestochhealthbrecords = await Health.find([
      { farmerId: farmerid },
      { liverstockId: livestockid }
    ]);
    return livestochhealthbrecords;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Farmer livestock record
exports.addHealthRecord = async (req) => {
  try {
    const healthrecord = new Health(req);
    const newRecord = await healthrecord.save();
    return newRecord;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing health Record
exports.updateHealthRecord = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateData = req.params === undefined ? req : req.params;
    const updated = await Health.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return updated;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete health record
exports.deleteAlert = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const deletehealth = await Health.findByIdAndRemove(id);
    return deletehealth;
  } catch (err) {
    throw boom.boomify(err);
  }
};
