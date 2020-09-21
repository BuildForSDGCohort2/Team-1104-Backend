const boom = require('boom');

// Get Data Models
const RequestLogs = require('../models/RequestLogs');
// get all messages
exports.getAllLogs = async () => {
  try {
    const logs = await RequestLogs.find();
    return logs;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get request logs by response code
exports.getLogsByRescode = async (req) => {
  try {
    const rescode = req.params === undefined ? req.rescode : req.params.rescode;
    const unsentmsgs = await RequestLogs.find({ resCode: rescode });
    return unsentmsgs;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// get request logs by request type
exports.getLogsByRescode = async (req) => {
  try {
    const reqtype =
      req.params === undefined ? req.reqMethod : req.params.reqMethod;
    const lgs = await RequestLogs.find({ reqMethod: reqtype });
    return lgs;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get Request Logs by id
exports.getLogById = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const logid = await Message.find({ id: id });
    return logid;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new log
exports.addLogs = async (req) => {
  try {
    const reqlog = new RequestLogs(req);
    const newlog = await reqlog.save();
    return newlog;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing Message
exports.updateReqLog = async (req) => {
  try {
    const reqid = req.params === undefined ? req.id : req.params.id;
    const updateLog = req.params === undefined ? req : req.params;
    const updatedLog = await Message.findByIdAndUpdate(reqid, updateLog, {
      new: true
    });
    return updatedLog;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a Log by id
exports.deleteLog = async (req) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const lg = await RequestLogs.findByIdAndRemove(id);
    return lg;
  } catch (err) {
    throw boom.boomify(err);
  }
};
