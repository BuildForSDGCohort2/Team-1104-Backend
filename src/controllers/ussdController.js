const boom = require('boom');

// Get Data Models
const Ussd = require('../models/Ussd');
// get all ussd users
exports.getUssdUsers = async () => {
  try {
    const ussdusers = await Ussd.find();
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
    const ussdphone = await Ussd.find({ phone: phone });
    return ussdphone;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new user
exports.addussdUser = async (req) => {
  try {
    const ussd = new User(req);
    const newuser = await ussd.save();
    return newuser;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing user
exports.updateussdUser = async (req) => {
  try {
    const ussdid = req.params === undefined ? req.ussdid : req.params.ussdid;
    const updateussduser = req.params === undefined ? req : req.params;
    const updatedussd = await Ussd.findByIdAndUpdate(ussdid, updateussduser, {
      new: true
    });
    return updatedussd;
  } catch (err) {
    throw boom.boomify(err);
  }
};
