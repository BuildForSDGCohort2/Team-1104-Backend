const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const FollowUpModel = require('../../src/models/FollowUps');
const HealthModel = require('../../src/models/Health');
const UserModel = require('../../src/models/SysUsers');
setupDB('health');

describe('FollowUp Model Test', () => {
  it('create & save Livestock follow ups records successfully when all details are correct', async () => {
    const followupData = {
      healthId: await HealthModel.findOne({ recordType: 'Treatment' }),
      remarks: 'On way to recovery added some antibiotics',
      cost: 200,
      vetId: await UserModel.findOne({ phone: '254720953991' })
    };
    const followUp = new FollowUpModel(followupData);
    const savedFollowup = await followUp.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedFollowup.id).toBeDefined();
    expect(JSON.stringify(savedFollowup.healthId)).toBe(
      JSON.stringify(followupData.healthId.id)
    );
    expect(savedFollowup.remarks).toBe(followupData.remarks);
    expect(savedFollowup.cost).toBe(followupData.cost);
    expect(JSON.stringify(savedFollowup.vetId)).toBe(
      JSON.stringify(followupData.vetId.id)
    );
    expect(savedFollowup.createdAt).toBeInstanceOf(Date);
  });

  it('create followup without required fields should failed', async () => {
    const followupWithoutRequiredField = new FollowUpModel({
      cost: 200
    });
    let err = '';
    try {
      const savedFollowupWithoutRequiredField = await followupWithoutRequiredField.save();
      const error = savedFollowupWithoutRequiredField;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
