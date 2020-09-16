const mongoose = require('mongoose');

const { setupDB } = require('../test-setup');
setupDB('alert');
const AlertsModel = require('../../src/models/Alerts');
const UserModel = require('../../src/models/SysUsers');

describe('Alerts Model Test', () => {
  it('create & save Alerts successfully when all details are correct', async () => {
    const alerts = {
      user_Id: await UserModel.findOne({ email: 'ipkiruig83@xmail.com' }),
      alertType: 'Disease Outbreak',
      details: 'lumpy skin disease',
      source: 'vet'
    };
    const validAlert = new AlertsModel(alerts);
    const savedAlert = await validAlert.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedAlert._id).toBeDefined();
    expect(savedAlert.user_Id).toBe(alerts.user_Id._id);
    expect(savedAlert.alertType).toBe(alerts.alertType);
    expect(savedAlert.details).toBe(alerts.details);
    expect(savedAlert.source).toBe(alerts.source);
  });

  it('create Alert without required fields should failed', async () => {
    const farmerWithoutRequiredField = new AlertsModel({
      age: 35
    });
    let err = '';
    try {
      const savedFarmerWithoutRequiredField = await farmerWithoutRequiredField.save();
      error = savedFarmerWithoutRequiredField;
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
