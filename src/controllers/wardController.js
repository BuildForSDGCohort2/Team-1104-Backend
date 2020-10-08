const boom = require('boom');
const Ward = require('../models/Ward');

exports.getWards = async (req) => {
  const subcounty =
    req.params === undefined ? req.subCounty : req.params.subCounty;
  const wards = await Ward.find({ subCountyName: subcounty }).sort({
    wardName: 1
  });
  return wards;
};

exports.getWard = async (req) => {
  const subcounty =
    req.params === undefined ? req.subCounty : req.params.subCounty;
  const ward = req.params === undefined ? req.ward : req.params.ward;
  const cward = await Ward.findOne({
    subCountyName: subcounty,
    wardName: ward
  });
  return cward;
};
