const boom = require('boom');

// Get Data Models
const Ussd = require('../models/Ussd');
// get all ussd users
exports.getUssdUsers = async () => {
  try {
    const ussdusers = await Ussd.find({});
    return ussdusers;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get ussd user
exports.getUserById = async (req) => {
  try {
    const ussdid = req.params === undefined ? req.ussdid : req.params.ussdid;
    const userussd = await Ussd.find({ id: ussdid });
    return userussd;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get ussd user by phone
exports.getUserByPhone = async (req) => {
  try {
    const phone = req.params === undefined ? req.phone : req.params.phone;
    const ussdphone = await Ussd.findOne({ phone: phone });
    return ussdphone;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getUserByDeviceId = async (req) => {
  try {
    const deviceId = req.params === undefined ? req.id : req.params.id;
    const userDevice = await Ussd.findOne({ deviceId: deviceId });
    return userDevice;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new user
exports.addussdUser = async (req) => {
  try {
    const ussd = new Ussd(req);
    const newuser = await ussd.save();
    return newuser;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing user
exports.updateussdUser = async (req) => {
  try {
    const ussdid = req.params === undefined ? req.id : req.params.id;
    const updatedata =
      req.params === undefined ? req.updateData : req.params.updateData;
    const updatedussd = await Ussd.findByIdAndUpdate(ussdid, updatedata);
    return updatedussd;
  } catch (err) {
    throw boom.boomify(err);
  }
};
