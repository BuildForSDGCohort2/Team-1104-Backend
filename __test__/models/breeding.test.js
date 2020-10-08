const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const breedingModel = require('../../src/models/Breeding');
const FarmerModel = require('../../src/models/Farmer');
const LivestockModel = require('../../src/models/Livestock');
const UserModel = require('../../src/models/SysUsers');
setupDB('breeding');

describe('Breeding Model Test', () => {
  it('create & save Breeding records successfully when all details are correct', async () => {
    const breedingData = {
      farmerId: await FarmerModel.findOne({ phone: '254722395251' }),
      liverstockId: await LivestockModel.findOne({ name: 'Neema' }),
      bullCode: '007HO11314',
      bullName: 'MOGUL ET',
      cost: 1500,
      servedBy: await UserModel.findOne({ phone: '254720953991' })
    };
    const breedingRecord = new breedingModel(breedingData);
    const savedRecord = await breedingRecord.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedRecord.id).toBeDefined();
    expect(JSON.stringify(savedRecord.farmerId)).toBe(
      JSON.stringify(breedingData.farmerId.id)
    );
    expect(JSON.stringify(savedRecord.liverstockId)).toBe(
      JSON.stringify(breedingData.liverstockId.id)
    );
    expect(savedRecord.bullCode).toBe(breedingData.bullCode);
    expect(savedRecord.bullName).toBe(breedingData.bullName);
    expect(JSON.stringify(savedRecord.servedBy)).toBe(
      JSON.stringify(breedingData.servedBy.id)
    );
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
