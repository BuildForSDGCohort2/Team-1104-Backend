const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const breedingSchema = new mongoose.Schema({
  farmerId: {
    type: ObjectId,
    required: true
  },
  liverstockId: {
    type: ObjectId,
    required: true
  },
  bullCode: {
    type: String,
    required: true
  },
  bullName: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  servedBy: {
    type: ObjectId,
    required: false
  },
  status: {
    type: String,
    required: true,
    default: 'Unconfirmed'
  },
  confirmationDate: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Breeding', breedingSchema);
