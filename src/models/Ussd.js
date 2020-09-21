const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ussdSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true
  },
  phone: {
    type: String,
    unique: true,
    required: [true, 'Farmer phone number required']
  },
  userType: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  pinStatus: {
    type: String,
    required: true,
    default: 'CHANGE'
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ussd', ussdSchema);
