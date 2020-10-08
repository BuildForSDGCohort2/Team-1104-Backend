require('dotenv').config();
const boom = require('boom');
const credentials = {
  apiKey: '95aba8cc59a79d5f76cecb33564245b89f1da7634a3cc00737ec4dc2caf7ddc1', // use your sandbox app API key for development in the test environment
  username: 'ipkiruig' // use 'sandbox' for development in the test environment
};
const Africastalking = require('africastalking')(credentials);
const msgController = require('../controllers/msgController');

// Initialize a service e.g. SMS
const sms = Africastalking.SMS;

// Use the service

exports.sendMessage = async (data) => {
  const options = {
    to: ['+' + data.sendTo],
    message: data.message
  };
  try {
    const sentInfo = await sms.send(options);
    msgController.addMessage({
      code: 0,
      message: data.message,
      sentStatus: 1,
      phone: data.sendTo,
      failCode: '0',
      failMsg: 'ok'
    });

    return sentInfo;
  } catch (error) {
    msgController.addMessage({
      code: 0,
      message: data.message,
      phone: data.sendTo,
      failCode: 'failed',
      failMsg: error
    });
    throw boom.boomify(err);
  }
};
// Send message and capture the response or error
