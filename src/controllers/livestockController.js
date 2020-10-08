const boom = require('boom');

// Get Data Models
const Livestock = require('../models/Livestock');
// get all farmer livestock
exports.getFarmerLivestock = async (req) => {
  try {
    const farmerid =
      req.params === undefined ? req.farmerid : req.params.farmerid;
    const cows = await Livestock.find({ farmerId: farmerid });
    return cows;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get farmer livesstock by id
exports.getLivestock = async (req) => {
  try {
    const farmerid =
      req.params === undefined ? req.farmerid : req.params.farmerid;
    const livestockid = req.params === undefined ? req.id : req.params.id;
    const cow = await Livestock.findOne({
      farmerId: farmerid,
      id: livestockid
    });
    return cow;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getLivestockByFarmerId = async (req) => {
  try {
    const farmerid =
      req.params === undefined ? req.farmerid : req.params.farmerid;
    const livestockid = req.params === undefined ? req.cowid : req.params.cowid;
    const cow = await Livestock.find({ farmerId: farmerid });
    return cow;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getLivestockById = async (req) => {
  try {
    const livestockid = req.params === undefined ? req.id : req.params.id;
    const cow = await Livestock.findById(livestockid);
    return cow;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Farmer cow
exports.addLivestock = async (req) => {
  try {
    const livestock = new Livestock(req);
    const newcow = await livestock.save();
    return newcow;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing Livestock Record
exports.updateLivestock = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateData = req.params === undefined ? req : req.params;
    const cowupdate = await Livestock.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return cowupdate;
  } catch (err) {
    throw boom.boomify(err);
  }
};
