const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const alertactionSchema = new mongoose.Schema({
  actionId: {
    type: ObjectId,
    required: true
  },
  userId: {
    type: ObjectId,
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
    default: Date.now
  }
});

module.exports = mongoose.model('AlertAction', alertactionSchema);
