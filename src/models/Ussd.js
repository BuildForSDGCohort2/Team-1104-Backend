const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ussdSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    default: null
  },
  phone: {
    type: String,
    unique: true,
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
