const boom = require('boom');

// Get Data Models
const User = require('../models/SysUsers');
// get all users
exports.getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get user
exports.getUserById = async (req) => {
  try {
    const userid = req.params === undefined ? req.userid : req.params.userid;
    const user = await User.find({ id: userid });
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new user
exports.addUser = async (req) => {
  try {
    const user = new User(req);
    const newuser = await user.save();
    return newuser;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing user
exports.updateUser = async (req) => {
  try {
    const id = req.params === undefined ? req.userid : req.params.userid;
    const updateuser = req.params === undefined ? req : req.params;
    const updateduser = await User.findByIdAndUpdate(id, updateuser, {
      new: true
    });
    return updateduser;
  } catch (err) {
    throw boom.boomify(err);
  }
};
