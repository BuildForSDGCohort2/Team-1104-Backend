const mongoose = require('mongoose');

const countySchema = new mongoose.Schema({
  countyCode: {
    type: Number,
    required: true
  },
  countyName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('County', countySchema);
