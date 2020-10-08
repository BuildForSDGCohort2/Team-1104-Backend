const boom = require('boom');
const Subcounty = require('../models/Subcounty');

exports.getSubCounties = async (req) => {
  const county = req.params === undefined ? req.county : req.params.county;

  const subcounties = await Subcounty.find({ countyName: county }).sort({
    subCountyName: 1
  });
  return subcounties;
};

exports.getSubCounty = async (req) => {
  const county = req.params === undefined ? req.county : req.params.county;
  const subcounty =
    req.params === undefined ? req.subCounty : req.params.subCounty;
  const scounty = await Subcounty.findOne({
    countyName: county,
    subCountyName: subcounty
  });
  return scounty;
};
