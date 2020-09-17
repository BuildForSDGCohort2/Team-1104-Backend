const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const healthSchema = new mongoose.Schema({
  recordNo: {
    type: String,
    default: null
  },
  farmerId: {
    type: ObjectId,
    required: true
  },
  livestockId: {
    type: ObjectId,
    required: true
  },
  recordType: {
    type: String,
    required: true
  },
  diagnosis: {
    type: String,
    required: true,
    default: null
  },
  medicineUsed: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    default: 0
  },
  vetId: {
    type: ObjectId,
    default: null
  },
  remarks: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Health', healthSchema);
