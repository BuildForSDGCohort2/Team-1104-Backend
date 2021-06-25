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

const farmerSchema = new mongoose.Schema({
  farmerNo: {
    type: String,
    default: null
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
    unique: true,
    validate: {
      validator: function (v) {
        return /^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/.test(
          v
        );
      },
      message: (props) => {
        `${props.value} is not a valid phone number!`;
      }
    },
    required: [true, 'phone number required']
  },
  county: {
    type: String,
    required: true
  },
  subCounty: {
    type: String,
    required: true
  },
  ward: {
    type: String,
    required: true
  },
  assessed: {
    type: Boolean,
    required: true,
    default: false
  },
  assessedBy: {
    type: String,
    required: false,
    default: null
  },
  assessedDate: {
    type: String,
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

module.exports = mongoose.model('Farmer', farmerSchema);
