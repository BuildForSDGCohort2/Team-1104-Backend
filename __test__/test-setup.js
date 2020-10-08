require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const UserModel = require('../src/models/SysUsers');
const FarmerModel = require('../src/models/Farmer');
const livestockModel = require('../src/models/Livestock');
const HealthModel = require('../src/models/Health');
const testAdmin = {
  firstName: 'Yegon',
  lastName: 'Kipkirui Geoffrey',
  phone: '254723953991',
  email: 'ipkiruig83@xmail.com',
  county: 'Kericho',
  subCounty: 'Bureti',
  ward: 'Kisiara',
  gender: 'Male',
  department: 'Administrator',
  password: process.env.PASSWORD
};

const testFarmer = {
  firstName: 'Yegon',
  lastName: 'Kipkirui Geoffrey',
  phone: '254722395251',
  county: 'Kericho',
  subCounty: 'Bureti',
  ward: 'Kisiara',
  gender: 'Male',
  age: 35
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  if (isEmpty(collections)) return;
  for (const collection of collections) {
    await mongoose.connection.collections[collection].deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  if (isEmpty(collections)) return;
  for (const collectionName of collections) {
    await mongoose.connection.collections[collectionName].drop();
  }
}

module.exports = {
  setupDB(databaseName) {
    // Connect to Mongoose
    beforeAll(async () => {
      const url = `${process.env.TEST_DATABASE_URL}${databaseName}`;
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    });

    // seed data to db before each test
    beforeEach(async () => {
      await UserModel.create(testAdmin);
      await FarmerModel.create(testFarmer);
      const testVet = {
        firstName: 'Yegon',
        lastName: 'Kipkirui Geoffrey',
        phone: '254720953991',
        email: 'ipkiruig83@vmail.com',
        county: 'Kericho',
        subCounty: 'Bureti',
        ward: 'Kisiara',
        gender: 'Male',
        department: 'Administrator',
        password: process.env.PASSWORD
      };

      const testLivestock = {
        farmerId: await FarmerModel.findOne({ phone: '254722395251' }),
        categoryAtRegistration: 'Heifer',
        name: 'Neema',
        breed: 'Holstein',
        sex: 'Heifer'
      };

      await UserModel.create(testVet);
      await livestockModel.create(testLivestock);
      const testHealth = {
        farmerId: await FarmerModel.findOne({ phone: '254722395251' }),
        livestockId: await livestockModel.findOne({ name: 'Neema' }),
        recordType: 'Treatment',
        diagnosis: 'Acute Mastitis',
        medicineUsed: 'Mastisol, Buterlex',
        cost: 2100,
        vetId: await UserModel.findOne({ phone: '254720953991' })
      };
      await HealthModel.create(testHealth);
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  }
};
