const mongoose = require('mongoose');

const reqSchema = new mongoose.Schema({
  req_id: {
    type: String,
    required: true
  },
  reqMethod: {
    type: String,
    required: true
  },
  reqBody: {
    type: JSON,
    required: false
  },
  resCode: {
    type: String,
    required: true,
    default: null
  },
  resTime: {
    type: String,
    required: true,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RequestLogs', reqSchema);
