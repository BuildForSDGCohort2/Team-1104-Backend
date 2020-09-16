const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

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

const vetsSchema = new mongoose.Schema({
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
    required: [true, 'Vet phone number required']
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => {
        `${props.value} is not a valid Email!`;
      }
    },
    required: [true, 'Vet email required']
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
  is_active: {
    type: Boolean,
    default: true
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
  registeredBy: {
    type: ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vets', vetsSchema);
