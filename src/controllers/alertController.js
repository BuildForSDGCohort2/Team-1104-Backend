const boom = require('boom');

// Get Data Models
const Alerts = require('../models/Alerts');

// Get all alerts
exports.getAlerts = async () => {
  const alerts = await Alerts.find();
  return alerts;
};
// Get all un-action alerts
exports.getUnactionAlerts = async () => {
  try {
    const unactionalerts = await Alerts.find({ actions: null });
    return unactionalerts;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single alert by ID
exports.getSingleAlert = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const alert = await Alerts.findById(id);
    return alert;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new alert
exports.addAlert = async (req) => {
  try {
    const alert = new Alerts(req);
    const newAlert = await alert.save();
    return newAlert;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing car
exports.updateAlert = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateData = req.params === undefined ? req : req.params;
    const update = await Alerts.findByIdAndUpdate(id, updateData, {
      new: true
    });
    return update;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a Alert
exports.deleteAlert = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const alert = await Alerts.findByIdAndRemove(id);
    return alert;
  } catch (err) {
    throw boom.boomify(err);
  }
};
