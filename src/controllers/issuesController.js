const boom = require('boom');

// Get Data Models
const Issues = require('../models/FarmerIssues');
// get all issues
exports.getIssues = async () => {
  try {
    const issues = await Issues.find({});
    return issues;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get undone issues
exports.getUndoneIssues = async () => {
  try {
    const undoneissues = await Issues.find({ status: null });
    return undoneissues;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single farmer issue by Id
exports.getIssueById = async (req) => {
  try {
    const id = req.params === undefined ? req.issueid : req.params.issueid;
    const farmer = await Issues.findById(id);
    return farmer;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new Farmer Issue
exports.addIssue = async (req) => {
  try {
    const issue = new Issues(req);
    const newIssue = await issue.save();
    return newIssue;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing Issue Record
exports.updateIssue = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateData = req.params === undefined ? req : req.params;
    const update = await Issues.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};
