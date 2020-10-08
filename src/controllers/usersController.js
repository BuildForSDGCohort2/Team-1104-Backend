const boom = require('boom');

// Get Data Models
const User = require('../models/SysUsers');
// get all users
exports.getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get user
exports.getUserById = async (req) => {
  try {
    console.log(req);
    const userid = req.params === undefined ? req.id : req.params.id;
    const user = await User.findById(userid);
    return user;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get user by email
exports.getUserByEmail = async (req) => {
  try {
    const email = req.params === undefined ? req.email : req.params.email;

    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    return err;
  }
};

// Add a new user
exports.addUser = async (req) => {
  try {
    console.log(req);
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
    const id = req.params === undefined ? req.id : req.params.id;
    const updateuser =
      req.params === undefined ? req.updateData : req.params.updateData;

    const updateduser = await User.findByIdAndUpdate(id, updateuser);
    return updateduser;
  } catch (err) {
    console.log(err);
    throw boom.boomify(err);
  }
};
