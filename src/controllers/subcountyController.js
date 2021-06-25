const boom = require('boom');
const Subcounty = require('../models/Subcounty');
exports.getAllSubCounties = async () => {
  const allsubcounties = await Subcounty.find({}).sort({
    countyName: 1
  });
  return allsubcounties;
};

exports.getSubCounties = async (req) => {
  console.log(req);
  const county = req.params === undefined ? req.county : req.params.county;
  console.log('county', county);
  const subcounties = await Subcounty.find({ countyName: county }).sort({
    subCountyName: 1
  });
  console.log('subcounties', subcounties);
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
