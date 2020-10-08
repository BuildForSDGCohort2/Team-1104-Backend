const boom = require('boom');
const County = require('../models/County');

exports.getCounties = async () => {
  const counties = await County.find({}).sort({ countyName: 1 });
  return counties;
};

// Get all county by countyName
exports.getCounty = async (req) => {
  const county =
    req.params === undefined ? req.countyName : req.params.countyName;
  const fcounty = await County.findOne({ countyName: county });
  return fcounty;
};
