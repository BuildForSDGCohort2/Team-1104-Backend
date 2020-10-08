const mongoose = require('mongoose');

const ussdSessionSchema = new mongoose.Schema({
  serviceCode: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
    default: null
  },
  sessionId: {
    type: String,
    required: true,
    default: null
  },
  level: {
    type: Number,
    required: true
  },
  sublevel: {
    type: Number,
    required: true,
    default: 0
  },
  data: {
    type: JSON,
    required: false
  },
  regstatus: {
    type: Boolean,
    required: true,
    default: false
  },
  assessedstatus: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UssdSession', ussdSessionSchema);
