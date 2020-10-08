const boom = require('boom');

// Get Data Models
const UssdSession = require('../models/UssdSessions');
// get all ussd session by service id
exports.getUssdSession = async (req) => {
  try {
    const sessionid =
      req.params === undefined ? req.sessionId : req.params.sessionId;
    console.log('id', sessionid);
    const ussdsession = await UssdSession.findOne({
      sessionId: sessionid
    }).exec();
    return ussdsession;
  } catch (err) {
    throw boom.boomify(err);
  }
};

exports.getUssdSessions = async (req) => {
  try {
    const ussdsessions = await UssdSession.find({});
    return ussdsessions;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get ussd user
exports.getUssdSessionById = async (req) => {
  try {
    const sessionid =
      req.params === undefined ? req.sessionid : req.params.sessionid;
    const ussdsession = await UssdSession.findById(sessionid);
    return ussdsession;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new ussd session
exports.addussdSession = async (req) => {
  try {
    const usession = new UssdSession(req);
    const newussdsession = await usession.save();
    return newussdsession;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing ussd session
exports.updateussdSession = async (req) => {
  try {
    const sessionid =
      req.params === undefined ? req.sessionId : req.params.sessionId;
    const updatesession =
      req.params === undefined ? req.updateData : req.params.updateData;
    const updatedussdsess = await UssdSession.updateOne(
      {
        sessionId: sessionid
      },
      updatesession
    );
    return updatedussdsess;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete ussd session
exports.deleteSession = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const uddsession = await UssdSession.findByIdAndRemove(id);
    return uddsession;
  } catch (err) {
    throw boom.boomify(err);
  }
};
