const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const productionSchema = new mongoose.Schema({
  _id: ObjectId,
  farmerNo: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  sub_county: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },
  assessed: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  pin: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false
  },
  location: {
    type: pointSchema,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Production', productionSchema);
