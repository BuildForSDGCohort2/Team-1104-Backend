const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const FarmerModel = require('../../src/models/Farmer');
const FarmerIssuesModel = require('../../src/models/FarmerIssues');
setupDB('issues');

describe('Farmer Issues Model Test', () => {
  it('create & save Issues raised by farmers successfully when all details are correct', async () => {
    const issuesData = {
      farmer_id: await FarmerModel.findOne({ phone: '254722395251' }),
      requestType: 'AI',
      details: 'AI'
    };
    const farmerissues = new FarmerIssuesModel(issuesData);
    const savedIssue = await farmerissues.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedIssue._id).toBeDefined();
    expect(savedIssue.farmer_id).toBe(issuesData.farmer_id._id);
    expect(savedIssue.requestType).toBe(issuesData.requestType);
  });

  it('create Issue without required fields should failed', async () => {
    const issueWithoutRequiredField = new FarmerIssuesModel({
      details: 'Treatment'
    });
    let err = '';
    try {
      const savedIssueWithoutRequiredField = await issueWithoutRequiredField.save();
      error = savedIssueWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
