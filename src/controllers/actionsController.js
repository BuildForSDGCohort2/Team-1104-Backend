const boom = require('boom');

// Get Data Models
const Actions = require('../models/AlertsActions');

// Get all actions
exports.getActions = async () => {
  const actions = await Actions.find();
  return actions;
};
// Get all un-action alerts

// Get single alert by ID
exports.getSingleAction = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const alert = await Actions.findById(id);
    return alert;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getActionByActionId = async (req) => {
  try {
    const id = req.params === undefined ? req.actionid : req.params.actionid;
    const action = await Actions.findOne({ actionId: id });
    return action;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new alert
exports.addAction = async (req) => {
  try {
    const action = new Actions(req);
    const newAction = await action.save();
    return newAction;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing car
exports.updateAction = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateData = req.params === undefined ? req : req.params;
    const update = await Actions.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a Alert
exports.deleteAction = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const alert = await Actions.findByIdAndRemove(id);
    return alert;
  } catch (err) {
    throw boom.boomify(err);
  }
};
