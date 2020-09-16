const mongoose = require('mongoose');
const Bcrypt = require('bcryptjs');

const usersSchema = new mongoose.Schema({
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
    required: [true, 'Farmer phone number required']
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
    required: [true, 'User email required']
  },
  department: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isStaff: {
    type: Boolean,
    default: true
  },
  gender: {
    type: String,
    required: true
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
  updatedAt: {
    type: Date,
    default: null
  },
  updatedBy: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = Bcrypt.genSaltSync(10);
  const hashedPassword = Bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
});

usersSchema.methods.comparePassword = function (plaintext) {
  return Bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model('Users', usersSchema);
