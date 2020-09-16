const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ussdSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^(?:254|\+254|0)?(7(?:(?:[129][0-9])|(?:0[0-8])|(4[0-1]))[0-9]{6})$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid phone number!`
    },
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
