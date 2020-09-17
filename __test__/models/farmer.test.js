const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const FarmerModel = require('../../src/models/Farmer');
setupDB('farmer');

const farmerData = {
  firstName: 'Yegon',
  lastName: 'Kipkirui Geoffrey',
  phone: '254700693363',
  county: 'Kericho',
  subCounty: 'Bureti',
  ward: 'Kisiara',
  gender: 'Male',
  age: 35
};

const farmerData2 = {
  firstName: 'Yegon',
  lastName: 'Kipkirui Geoffrey',
  phone: '25472239525',
  county: 'Kericho',
  subCounty: 'Bureti',
  ward: 'Kisiara',
  gender: 'Male',
  age: 35
};

describe('Farmer Model Test', () => {
  it('create & save Farmer details successfully when all details are correct', async () => {
    const validFarmer = new FarmerModel(farmerData);
    const savedFarmer = await validFarmer.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedFarmer.id).toBeDefined();
    expect(savedFarmer.firstName).toBe(farmerData.firstName);
    expect(savedFarmer.lastName).toBe(farmerData.lastName);
    expect(savedFarmer.phone).toBe(farmerData.phone);
    expect(savedFarmer.county).toBe(farmerData.county);
    expect(savedFarmer.subCounty).toBe(farmerData.subCounty);
    expect(savedFarmer.ward).toBe(farmerData.ward);
    expect(savedFarmer.pin).toBe(farmerData.pin);
    expect(savedFarmer.gender).toBe(farmerData.gender);
    expect(savedFarmer.age).toBe(farmerData.age);
  });

  it('create farmer with invalid phone number should failed', async () => {
    const farmerWithInvalidPhone = new FarmerModel(farmerData2);
    let err = '';
    try {
      const savedfarmerWithInvalidPhone = await farmerWithInvalidPhone.save();
      const error = savedfarmerWithInvalidPhone;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('create farmer without required fields should failed', async () => {
    const farmerWithoutRequiredField = new FarmerModel({
      age: 35
    });
    let err = '';
    try {
      const savedFarmerWithoutRequiredField = await farmerWithoutRequiredField.save();
      const error = savedFarmerWithoutRequiredField;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
