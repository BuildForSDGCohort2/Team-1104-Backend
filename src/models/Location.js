const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: false,
    default: null
  },
  coordinates: {
    type: [Number],
    required: false,
    default: null
  }
});

const locationSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: false,
    default: null
  },
  updatedBy: {
    type: String,
    required: false,
    default: null
  },
  updateDate: {
    type: Date,
    required: false,
    default: null
  },
  farmName: {
    type: String,
    required: false,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: false,
    default: null
  },
  location: {
    type: pointSchema,
    required: false,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Location', locationSchema);
