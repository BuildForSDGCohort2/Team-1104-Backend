const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const alertsSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  alertType: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  actions: {
    type: String,
    required: false,
    default: null
  },
  actionedBy: {
    type: ObjectId,
    required: false,
    default: null
  },
  actionedDate: {
    type: Date,
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Alerts', alertsSchema);
