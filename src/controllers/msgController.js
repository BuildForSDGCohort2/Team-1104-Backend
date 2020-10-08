const boom = require('boom');

// Get Data Models
const Message = require('../models/Msg');
// get all messages
exports.getMessages = async () => {
  try {
    const msgs = await Message.find();
    return msgs;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get all unsent messages
exports.getUnsentMessages = async () => {
  try {
    const unsentmsgs = await Message.find({ sentStatus: 0 });
    return unsentmsgs;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get all unsent messages
exports.getsentMessages = async () => {
  try {
    const sentmsgs = await Message.find({ sentStatus: 1 });
    return sentmsgs;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get all messages
exports.getAllMessages = async () => {
  try {
    const messages = await Message.find({});
    return messages;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get all messages
exports.getMessageById = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const message = await Message.findById(id);
    return message;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new message
exports.addMessage = async (req) => {
  try {
    const msg = new Message(req);
    const newmsq = await msg.save();
    return newmsq;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing Message
exports.updateMessage = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const updateMsg = req.params === undefined ? req : req.params;
    const msgupdate = await Message.findByIdAndUpdate(id, updateMsg, {
      new: true
    });
    return msgupdate;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a Message
exports.deleteMessage = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const msg = await Message.findByIdAndRemove(id);
    return msg;
  } catch (err) {
    throw boom.boomify(err);
  }
};
