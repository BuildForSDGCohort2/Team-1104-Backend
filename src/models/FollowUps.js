const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const followupSchema = new mongoose.Schema({
  healthId: {
    type: ObjectId,
    required: true
  },
  vetId: {
    type: ObjectId,
    required: true
  },
  remarks: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FollowUps', followupSchema);
