const mongoose = require('mongoose');

const msgSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
    default: 1
  },
  message: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  sentStatus: {
    type: Number,
    required: true,
    default: 0
  },
  failCode: {
    type: String,
    required: true,
    default: null
  },
  failMsg: {
    type: String,
    required: true,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Msg', msgSchema);
