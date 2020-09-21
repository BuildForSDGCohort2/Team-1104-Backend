const boom = require('boom');

// Get Data Models
const FollowUp = require('../models/FollowUps');
// get every Health folow ups tus
exports.getAllFollowups = async () => {
  const followups = await FollowUp.find();
  return followups;
};

// Get all by Health Id
exports.getByHealthId = async (req) => {
  try {
    const healthid =
      req.params === undefined ? req.healthId : req.params.healthId;
    const healthfollowups = await FollowUp.find({ healthId: healthid });
    return healthfollowups;
  } catch (err) {
    throw boom.boomify(err);
  }
};
// Get all by Vet Id
exports.getByVetId = async (req) => {
  try {
    const Vetid = req.params === undefined ? req.vetId : req.params.vetId;
    const vetfollowups = await FollowUp.find({ vetId: Vetid });
    return vetfollowups;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single followup by ID
exports.getFollowupById = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const follow = await FollowUp.findById(id);
    return follow;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Health follow up
exports.addHealthFollowUP = async (req) => {
  try {
    const hfollowup = new FollowUp(req);
    const newhfollowup = await hfollowup.save();
    return newhfollowup;
  } catch (err) {
    throw boom.boomify(err);
  }
};
