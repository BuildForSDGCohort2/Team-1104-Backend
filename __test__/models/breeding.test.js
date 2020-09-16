const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const breedingModel = require('../../src/models/Breeding');
const FarmerModel = require('../../src/models/Farmer');
const VetsModel = require('../../src/models/Vets');
const LivestockModel = require('../../src/models/Livestock');
setupDB('breeding');

describe('Breeding Model Test', () => {
  it('create & save Breeding records successfully when all details are correct', async () => {
    const breedingData = {
      farmer_id: await FarmerModel.findOne({ phone: '254722395251' }),
      liverstock_id: await LivestockModel.findOne({ name: 'Neema' }),
      bullCode: '007HO11314',
      bullName: 'MOGUL ET',
      cost: 1500,
      servedBy: await VetsModel.findOne({ phone: '254720953991' })
    };
    const breedingRecord = new breedingModel(breedingData);
    const savedRecord = await breedingRecord.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedRecord._id).toBeDefined();
    expect(savedRecord.farmer_id).toBe(breedingData.farmer_id._id);
    expect(savedRecord.liverstock_id).toBe(breedingData.liverstock_id._id);
    expect(savedRecord.bullCode).toBe(breedingData.bullCode);
    expect(savedRecord.bullName).toBe(breedingData.bullName);
    expect(savedRecord.servedBy).toBe(breedingData.servedBy._id);
  });

  it('create Breeding without required fields should failed', async () => {
    const recordWithoutRequiredField = new breedingModel({
      age: 35
    });
    let err = '';
    try {
      const savedrecordWithoutRequiredField = await recordWithoutRequiredField.save();
      const error = savedrecordWithoutRequiredField;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
