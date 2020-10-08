const Bcrypt = require('bcryptjs');

const helper = {
  generateRandomString() {
    return Math.floor(1000 + Math.random() * 9000);
  },

  toTitleCase(word) {
    return word

      .split(' ')

      .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())

      .join(' ');
  },

  // eslint-disable-next-line consistent-return
  comparePassword(hashPassword, password) {
    return Bcrypt.compareSync(password, hashPassword);
  }
};

module.exports = helper;
