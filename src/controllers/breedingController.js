const boom = require('boom');

// Get Data Models
const Breeding = require('../models/Breeding');

// Get all breeding records
exports.getBreeding = async () => {
  try {
    const brecords = await Breeding.find();
    return brecords;
  } catch (err) {
    throw boom.boomify(err);
  }
};
// Get all farmer breeding records
exports.getAllFarmerBrecords = async (req) => {
  try {
    const farmerId =
      req.params === undefined ? req.farmerId : req.params.farmerId;
    const farmerbrecords = await Breeding.find({ farmerId: farmerId });
    return farmerbrecords;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getAllFarmerBrecords = async (req) => {
  try {
    const farmerid =
      req.params === undefined ? req.farmerId : req.params.farmerId;
    const livestockid =
      req.params === undefined ? req.livestockId : req.params.livestockId;
    const livestochbrecords = await Breeding.find([
      { farmerId: farmerid },
      { liverstockId: livestockid }
    ]);
    return livestochbrecords;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single breed by ID
exports.getSingleBreed = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const breed = await Breeding.findById(id);
    return breed;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new breeding Record
exports.addBreed = async (req) => {
  try {
    const breed = new Breeding(req);
    const newbreed = await breed.save();
    return newbreed;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing Breed Record
exports.updateBreed = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateData = req.params === undefined ? req : req.params;
    const update = await Breeding.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a breed record
exports.deleteBreed = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const breed = await Breeding.findByIdAndRemove(id);
    return breed;
  } catch (err) {
    throw boom.boomify(err);
  }
};
