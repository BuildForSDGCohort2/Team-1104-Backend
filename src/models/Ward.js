const mongoose = require('mongoose');

const wardSchema = new mongoose.Schema({
  subCountyName: {
    type: String,
    required: true
  },
  wardName: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Ward', wardSchema);
