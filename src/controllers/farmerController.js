const boom = require('boom');

// Get Data Models
const Farmer = require('../models/Farmer');
// get every farmer all status
exports.getAllFarmers = async () => {
  const allfarmers = await Farmer.find();
  return allfarmers;
};

// Get all Active farmers
exports.getActiveFarmers = async () => {
  try {
    const activefarmers = await Farmer.find({ isActive: true });
    return activefarmers;
  } catch (err) {
    throw boom.boomify(err);
  }
};
// Get all dormant farmer
exports.getDormantFarmers = async () => {
  try {
    const dormantfarmers = await Farmer.find({ isActive: false });
    return dormantfarmers;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single farmer by ID
exports.getFarmerById = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const farmer = await Farmer.findById(id);
    return farmer;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Farmer details
exports.addFarmer = async (req) => {
  try {
    const famer = new Farmer(req);
    const newfarmer = await famer.save();
    return newfarmer;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing Breed Record
exports.updateFarmer = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateData = req.params === undefined ? req : req.params;
    const update = await Farmer.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.deleteFarmer = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const deletedFarmer = await farmer.findByIdAndRemove(id);
    return deletedFarmer;
  } catch (err) {
    throw boom.boomify(err);
  }
};
