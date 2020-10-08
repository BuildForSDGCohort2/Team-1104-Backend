const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
setupDB('user');
const UserModel = require('../../src/models/SysUsers');

const userData = {
  firstName: 'Yegon',
  lastName: 'Kipkirui Geoffrey',
  phone: '254700693363',
  email: 'ipkiruig83@outlook.com',
  county: 'Kericho',
  subCounty: 'Bureti',
  ward: 'Kisiara',
  gender: 'Male',
  department: 'Administrator',
  password: process.env.PASSWORD
};

const userData2 = {
  firstName: 'Yegon',
  lastName: 'Kipkirui Geoffrey',
  phone: '25472398323',
  email: 'kipkiruismall@gmail.com',
  county: 'Kericho',
  subCounty: 'Bureti',
  ward: 'Kisiara',
  gender: 'Male',
  department: 'Administrator',
  password: process.env.PASSWORD
};

const userData3 = {
  firstName: 'Yegon',
  lastName: 'Kipkirui Geoffrey',
  phone: '254721395251',
  email: 'ipkiruig83gmail.com',
  county: 'Kericho',
  subCounty: 'Bureti',
  ward: 'Kisiara',
  gender: 'Male',
  department: 'Administrator',
  password: process.env.PASSWORD
};

describe('User Model Test', () => {
  it('create & save System User details successfully when all details are correct', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser.id).toBeDefined();
    expect(savedUser.firstName).toBe(userData.firstName);
    expect(savedUser.lastName).toBe(userData.lastName);
    expect(savedUser.phone).toBe(userData.phone);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.county).toBe(userData.county);
    expect(savedUser.subCounty).toBe(userData.subCounty);
    expect(savedUser.ward).toBe(userData.ward);
    expect(savedUser.gender).toBe(userData.gender);
    expect(savedUser.department).toBe(userData.department);
  });

  it('create User with invalid phone number should failed', async () => {
    const UserWithInvalidField = new UserModel(userData2);
    let err = '';
    try {
      const savedUserWithInvalidField = await UserWithInvalidField.save();
      const error = savedUserWithInvalidField;
      throw new Error(error);
    } catch (error) {
      err = error;
      // console.error(err);
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('create User with invalid Email should failed', async () => {
    const UserWithInvalidEmail = new UserModel(userData3);
    let err = '';
    try {
      const savedUserInvalidEmail = await UserWithInvalidEmail.save();
      const error = savedUserInvalidEmail;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });

  it('create User without required fields should failed', async () => {
    const UserWithoutRequiredField = new UserModel({
      age: 35
    });
    let err = '';
    try {
      const savedUserWithoutRequiredField = await UserWithoutRequiredField.save();
      const error = savedUserWithoutRequiredField;
      throw new Error(error);
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
