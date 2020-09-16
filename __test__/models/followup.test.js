const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const FollowUpModel = require('../../src/models/FollowUps');
const HealthModel = require('../../src/models/Health');
const VetsModel = require('../../src/models/Vets');
setupDB('health');

describe('FollowUp Model Test', () => {
  it('create & save Livestock follow ups records successfully when all details are correct', async () => {
    const followupData = {
      health_id: await HealthModel.findOne({ recordType: 'Treatment' }),
      remarks: 'On way to recovery added some antibiotics',
      cost: 200,
      vet_id: await VetsModel.findOne({ phone: '254720953991' })
    };
    const followUp = new FollowUpModel(followupData);
    const savedFollowup = await followUp.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedFollowup._id).toBeDefined();
    expect(savedFollowup.health_id).toBe(followupData.health_id._id);
    expect(savedFollowup.remarks).toBe(followupData.remarks);
    expect(savedFollowup.cost).toBe(followupData.cost);
    expect(savedFollowup.vet_id).toBe(followupData.vet_id._id);
    expect(savedFollowup.createdAt).toBeInstanceOf(Date);
  });

  it('create followup without required fields should failed', async () => {
    const followupWithoutRequiredField = new FollowUpModel({
      cost: 200
    });
    let err = '';
    try {
      const savedFollowupWithoutRequiredField = await followupWithoutRequiredField.save();
      error = savedFollowupWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
