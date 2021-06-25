const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
const { ObjectId } = mongoose.Schema.Types;

const ussdSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    default: null
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
  deviceId: {
    type: String,
    default: null
  },
  userType: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false,
    default: null
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

ussdSchema.pre('save', async function (next) {
  if (!this.isModified('pin')) return next();
  const salt = Bcrypt.genSaltSync(10);
  const hashedPassword = Bcrypt.hashSync(this.pin, salt);
  this.pin = hashedPassword;
});

module.exports = mongoose.model('Ussd', ussdSchema);
