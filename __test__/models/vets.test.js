const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
const vetsModel = require('../../src/models/Vets');
const UserModel = require('../../src/models/SysUsers');
setupDB('vets');

describe('Vets Model Test', () => {
  it('create & save new Vet successfully when all details are correct', async () => {
    const vetsData = {
      firstName: 'Yegon',
      lastName: 'Kipkirui Geoffrey',
      phone: '254720953992',
      email: 'ipkiruig83@v2mail.com',
      county: 'Kericho',
      sub_county: 'Bureti',
      ward: 'Kisiara',
      gender: 'Male',
      registeredBy: await UserModel.findOne({ email: 'ipkiruig83@xmail.com' })
    };
    const vet = new vetsModel(vetsData);
    const savedVet = await vet.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedVet._id).toBeDefined();
    expect(savedVet.firstName).toBe(vetsData.firstName);
    expect(savedVet.lastName).toBe(vetsData.lastName);
    expect(savedVet.phone).toBe(vetsData.phone);
    expect(savedVet.email).toBe(vetsData.email);
    expect(savedVet.county).toBe(vetsData.county);
    expect(savedVet.sub_county).toBe(vetsData.sub_county);
    expect(savedVet.ward).toBe(vetsData.ward);
    expect(savedVet.gender).toBe(vetsData.gender);
    expect(savedVet.registeredBy).toBe(vetsData.registeredBy._id);
  });

  it('create Vet with invalid phone number should failed', async () => {
    const vetsData2 = {
      firstName: 'Yegon',
      lastName: 'Kipkirui Geoffrey',
      phone: '25472095399',
      email: 'ipkiruig83@v3mail.com',
      county: 'Kericho',
      sub_county: 'Bureti',
      ward: 'Kisiara',
      gender: 'Male',
      registeredBy: await UserModel.findOne({ email: 'ipkiruig83@xmail.com' })
    };
    const VetWithInvalidField = new vetsModel(vetsData2);
    let err = '';
    try {
      const savedVetWithInvalidField = await VetWithInvalidField.save();
      const error = savedVetWithInvalidField;
      throw new Error(error);
    } catch (error) {
      err = error;
      // console.error(err);
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('create Vet with invalid Email should failed', async () => {
    const vetsData3 = {
      firstName: 'Yegon',
      lastName: 'Kipkirui Geoffrey',
      phone: '254722953991',
      email: 'ipkiruig83v3mail.com',
      county: 'Kericho',
      sub_county: 'Bureti',
      ward: 'Kisiara',
      gender: 'Male',
      registeredBy: await UserModel.findOne({ email: 'ipkiruig83@xmail.com' })
    };
    const VetWithInvalidEmail = new vetsModel(vetsData3);
    let err = '';
    try {
      const savedVetInvalidEmail = await VetWithInvalidEmail.save();
      const error = savedVetInvalidEmail;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('create Breeding without required fields should failed', async () => {
    const vetWithoutRequiredField = new vetsModel({
      age: 35
    });
    let err = '';
    try {
      const savedvetWithoutRequiredField = await vetWithoutRequiredField.save();
      const error = savedvetWithoutRequiredField;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
