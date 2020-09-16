const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const livestockSchema = new mongoose.Schema({
  farmer_id: {
    type: ObjectId,
    required: true
  },
  categoryAtRegistration: {
    type: String,
    required: true
  },
  calvings: {
    type: Number,
    required: true,
    default: 0
  },
  name: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true,
    default: 'Heifer'
  },
  digivetTag: {
    type: String,
    default: null
  },
  dateTagged: {
    type: Date,
    default: null
  },
  taggedBy: {
    type: ObjectId,
    default: null
  },
  dam: {
    type: String,
    default: null
  },
  damCode: {
    type: String,
    default: null
  },
  sire: {
    type: String,
    default: null
  },
  sireCode: {
    type: String,
    default: null
  },
  status: {
    type: Number,
    required: true,
    default: 0
  },
  updatedBy: {
    type: ObjectId,
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Livestock', livestockSchema);
