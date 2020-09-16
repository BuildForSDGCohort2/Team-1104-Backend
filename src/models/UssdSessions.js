const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ussdSessionSchema = new mongoose.Schema({
  serviceCode: {
    type: String,
    required: true
  },
  user_id: {
    type: ObjectId,
    required: true,
    default: null
  },
  sessiontype: {
    type: String,
    required: true,
    default: null
  },
  level: {
    type: Number,
    required: true
  },
  data: {
    type: JSON,
    required: false
  },
  status: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UssdSession', ussdSessionSchema);
