const mongoose = require('mongoose');

const subcountySchema = new mongoose.Schema({
  countyName: {
    type: String,
    required: true
  },
  subCountyName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Subcounty', subcountySchema);
