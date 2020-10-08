const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const HealthModel = require('../../src/models/Health');
const FarmerModel = require('../../src/models/Farmer');
const LivestockModel = require('../../src/models/Livestock');
const UserModel = require('../../src/models/SysUsers');

setupDB('health');

describe('Health Model Test', () => {
  it('create & save Livestock Health records successfully when all details are correct', async () => {
    const healthData = {
      farmerId: await FarmerModel.findOne({ phone: '254722395251' }),
      livestockId: await LivestockModel.findOne({ name: 'Neema' }),
      recordType: 'Treatment',
      diagnosis: 'Acute Mastitis',
      medicineUsed: 'Mastisol, Buterlex',
      cost: 2100,
      vetId: await UserModel.findOne({ phone: '254720953991' })
    };
    const healthRecords = new HealthModel(healthData);
    const savedHealth = await healthRecords.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedHealth.id).toBeDefined();
    expect(JSON.stringify(savedHealth.farmerId)).toBe(
      JSON.stringify(healthData.farmerId.id)
    );
    expect(JSON.stringify(savedHealth.livestockId)).toBe(
      JSON.stringify(healthData.livestockId.id)
    );
    expect(savedHealth.diagnosis).toBe(healthData.diagnosis);
    expect(savedHealth.medicineUsed).toBe(healthData.medicineUsed);
    expect(savedHealth.cost).toBe(healthData.cost);
    expect(JSON.stringify(savedHealth.vetId)).toBe(
      JSON.stringify(healthData.vetId.id)
    );
    expect(savedHealth.createdAt).toBeInstanceOf(Date);
  });

  it('create Issue without required fields should failed', async () => {
    const healthWithoutRequiredField = new HealthModel({
      diagnosis: 'Treatment'
    });
    let err = '';
    try {
      const savedHealthWithoutRequiredField = await healthWithoutRequiredField.save();
      const error = savedHealthWithoutRequiredField;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
