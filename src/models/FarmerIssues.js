const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const farmerissuesSchema = new mongoose.Schema({
  farmerId: {
    type: ObjectId,
    required: true
  },
  issueNo: {
    type: String,
    default: null
  },
  requestType: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true,
    default: null
  },
  status: {
    type: String,
    default: null
  },
  action: {
    type: String,
    default: null
  },
  actionedBy: {
    type: ObjectId,
    default: null
  },
  actionedDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FarmerIssues', farmerissuesSchema);
