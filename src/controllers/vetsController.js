const boom = require('boom');

// Get Data Models
const Vet = require('../models/Vets');
// get all vets
exports.getVets = async () => {
  try {
    const vets = await Vet.find();
    return vets;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get vet
exports.getVetById = async (req) => {
  try {
    const vetid = req.params === undefined ? req.vetid : req.params.vetid;
    const vet = await Vet.find({ id: vetid });
    return vet;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new vet
exports.addVet = async (req) => {
  try {
    const vet = new Vet(req);
    const newvet = await vet.save();
    return newvet;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing vet
exports.updateVet = async (req) => {
  try {
    const id = req.params === undefined ? req.vetid : req.params.vetid;
    const updatevet = req.params === undefined ? req : req.params;
    const updatedvet = await Vet.findByIdAndUpdate(id, updatevet, {
      new: true
    });
    return updatedvet;
  } catch (err) {
    throw boom.boomify(err);
  }
};
