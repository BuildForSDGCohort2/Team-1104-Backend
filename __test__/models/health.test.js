const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const HealthModel = require('../../src/models/Health');
const FarmerModel = require('../../src/models/Farmer');
const LivestockModel = require('../../src/models/Livestock');
const VetsModel = require('../../src/models/Vets');
setupDB('health');

describe('Health Model Test', () => {
  it('create & save Livestock Health records successfully when all details are correct', async () => {
    const healthData = {
      farmer_id: await FarmerModel.findOne({ phone: '254722395251' }),
      livestock_id: await LivestockModel.findOne({ name: 'Neema' }),
      recordType: 'Treatment',
      diagnosis: 'Acute Mastitis',
      medicineUsed: 'Mastisol, Buterlex',
      cost: 2100,
      vet_id: await VetsModel.findOne({ phone: '254720953991' })
    };
    const healthRecords = new HealthModel(healthData);
    const savedHealth = await healthRecords.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedHealth._id).toBeDefined();
    expect(savedHealth.farmer_id).toBe(healthData.farmer_id._id);
    expect(savedHealth.livestock_id).toBe(healthData.livestock_id._id);
    expect(savedHealth.diagnosis).toBe(healthData.diagnosis);
    expect(savedHealth.medicineUsed).toBe(healthData.medicineUsed);
    expect(savedHealth.cost).toBe(healthData.cost);
    expect(savedHealth.vet_id).toBe(healthData.vet_id._id);
    expect(savedHealth.createdAt).toBeInstanceOf(Date);
  });

  it('create Issue without required fields should failed', async () => {
    const healthWithoutRequiredField = new HealthModel({
      diagnosis: 'Treatment'
    });
    let err = '';
    try {
      const savedHealthWithoutRequiredField = await healthWithoutRequiredField.save();
      error = savedHealthWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
