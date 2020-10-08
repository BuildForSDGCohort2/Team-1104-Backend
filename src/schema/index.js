// Import External Dependancies
const graphql = require('graphql');

// Destructure GraphQL functions
const {
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

// Import Controllers
const alertController = require('../controllers/alertController');
const breedingController = require('../controllers/breedingController');
const countiesController = require('../controllers/countiesController');
const subcountyController = require('../controllers/subcountyController');
const wardController = require('../controllers/wardController');
const farmerController = require('../controllers/farmerController');
const followupController = require('../controllers/followupsController');
const healthController = require('../controllers/healthController');
const issuesController = require('../controllers/issuesController');
const livestockController = require('../controllers/livestockController');
const messageController = require('../controllers/msgController');
const requestController = require('../controllers/requestController');
const usersController = require('../controllers/usersController');
const ussdController = require('../controllers/ussdController');
const sessiionController = require('../controllers/ussdsessionController');
const actionController = require('../controllers/actionsController');

// Define Object Types
const alertsType = new GraphQLObjectType({
  name: 'Alert',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    user: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({ userid: parent.userId });
      }
    },
    alertType: { type: GraphQLString },
    details: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    source: { type: GraphQLString }
  })
});

const actionType = new GraphQLObjectType({
  name: 'Action',
  fields: () => ({
    id: { type: GraphQLID },
    actionedBy: { type: GraphQLID },
    user: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({ userid: parent.actionedBy });
      }
    },
    actionId: { type: GraphQLID },
    alert: {
      type: alertsType,
      async resolve(parent, args) {
        return await alertController.getSingleAlert({ id: parent.actionId });
      }
    },
    actions: { type: GraphQLString },
    actionedDate: { type: GraphQLString }
  })
});

const breedType = new GraphQLObjectType({
  name: 'Breed',
  fields: () => ({
    id: { type: GraphQLID },
    farmerId: { type: GraphQLID },
    farmer: {
      type: farmerType,
      async resolve(parent, args) {
        return await farmerController.getFarmerById({ id: parent.farmerId });
      }
    },
    liverstockId: { type: GraphQLID },
    cow: {
      type: cowType,
      async resolve(parent, args) {
        return await livestockController.getLivestockById({
          id: parent.liverstockId
        });
      }
    },
    bullCode: { type: GraphQLString },
    bullName: { type: GraphQLString },
    cost: { type: GraphQLString },
    servedBy: { type: GraphQLID },
    vet: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({
          id: parent.servedBy
        });
      }
    },
    status: { type: GraphQLString },
    confirmationDate: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const countyType = new GraphQLObjectType({
  name: 'Counties',
  fields: () => ({
    id: { type: GraphQLID },
    countyCode: { type: GraphQLString },
    countyName: { type: GraphQLString }
  })
});

const subcountyType = new GraphQLObjectType({
  name: 'subCounties',
  fields: () => ({
    id: { type: GraphQLID },
    countyName: { type: GraphQLString },
    subCountyName: { type: GraphQLString }
  })
});

const wardType = new GraphQLObjectType({
  name: 'wards',
  fields: () => ({
    id: { type: GraphQLID },
    subCountyName: { type: GraphQLString },
    wardName: { type: GraphQLString }
  })
});

const farmerType = new GraphQLObjectType({
  name: 'Farmer',
  fields: () => ({
    id: { type: GraphQLID },
    farmerNo: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phone: { type: GraphQLString },
    county: { type: GraphQLString },
    subCounty: { type: GraphQLString },
    ward: { type: GraphQLString },
    assessed: { type: GraphQLBoolean },
    assessedBy: { type: GraphQLID },
    user: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({ userid: parent.assessedBy });
      }
    },
    cows: {
      type: new GraphQLList(cowType),
      async resolve(parent, args) {
        return await livestockController.getLivestockByFarmerId({
          farmerid: parent.id
        });
      }
    },
    assessedDate: { type: GraphQLString },
    farmName: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    gender: { type: GraphQLString },
    age: { type: GraphQLString },
    location: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const issueType = new GraphQLObjectType({
  name: 'Issue',
  fields: () => ({
    id: { type: GraphQLID },
    farmerId: { type: GraphQLID },
    farmer: {
      type: farmerType,
      async resolve(parent, args) {
        return await farmerController.getFarmerById({ id: parent.farmerId });
      }
    },
    issueNo: { type: GraphQLString },
    requestType: { type: GraphQLString },
    details: { type: GraphQLString },
    status: { type: GraphQLString },
    action: { type: GraphQLString },
    actionedBy: { type: GraphQLID },
    user: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({ userid: parent.actionedBy });
      }
    },
    actionedDate: { type: graphql.GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const followType = new GraphQLObjectType({
  name: 'Followup',
  fields: () => ({
    id: { type: GraphQLID },
    healthId: { type: GraphQLID },
    followUp: {
      type: healthType,
      async resolve(parent, args) {
        return await healthController.getrecordById({ id: parent.healthId });
      }
    },
    vetId: { type: GraphQLID },
    vet: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({
          id: parent.vetId
        });
      }
    },
    remarks: { type: GraphQLString },
    cost: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const healthType = new GraphQLObjectType({
  name: 'Health',
  fields: () => ({
    id: { type: GraphQLID },
    recordNo: { type: GraphQLString },
    farmerId: { type: GraphQLID },
    farmer: {
      type: farmerType,
      async resolve(parent, args) {
        return await farmerController.getFarmerById({ id: parent.farmerId });
      }
    },
    livestockId: { type: GraphQLID },
    cow: {
      type: cowType,
      async resolve(parent, args) {
        return await livestockController.getLivestockById({
          id: parent.liverstockId
        });
      }
    },
    recordType: { type: GraphQLString },
    diagnosis: { type: GraphQLString },
    medicineUsed: { type: GraphQLString },
    cost: { type: GraphQLString },
    vetId: { type: GraphQLID },
    vet: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({
          id: parent.vetId
        });
      }
    },
    remarks: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const cowType = new GraphQLObjectType({
  name: 'Cow',
  fields: () => ({
    id: { type: GraphQLID },
    categoryAtRegistration: { type: GraphQLString },
    farmerId: { type: GraphQLID },
    farmer: {
      type: farmerType,
      async resolve(parent, args) {
        return await farmerController.getFarmerById({ id: parent.farmerId });
      }
    },
    calvings: { type: GraphQLString },
    name: { type: GraphQLString },
    breed: { type: GraphQLString },
    sex: { type: GraphQLString },
    digivetTag: { type: GraphQLString },
    dateTagged: { type: GraphQLString },
    taggedBy: { type: GraphQLID },
    vet: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({
          id: parent.taggedBy
        });
      }
    },
    dam: { type: GraphQLString },
    damCode: { type: GraphQLString },
    sire: { type: GraphQLString },
    sireCode: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const msgType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    code: { type: GraphQLInt },
    message: { type: GraphQLString },
    phone: { type: GraphQLString },
    sentStatus: { type: GraphQLInt },
    failCode: { type: GraphQLString },
    failMsg: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const requestType = new GraphQLObjectType({
  name: 'Request',
  fields: () => ({
    id: { type: GraphQLID },
    reqId: { type: GraphQLString },
    reqMethod: { type: GraphQLString },
    reqBody: { type: GraphQLString },
    resCode: { type: GraphQLInt },
    resTime: { type: GraphQLString },
    createdAt: { type: GraphQLString }
  })
});

const userType = new GraphQLObjectType({
  name: 'Users',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    department: { type: GraphQLString },
    token: { type: GraphQLString },
    password: { type: GraphQLString },
    isActive: { type: GraphQLBoolean },
    isAdmin: { type: GraphQLBoolean },
    isStaff: { type: GraphQLBoolean },
    gender: { type: GraphQLString },
    county: { type: GraphQLString },
    subCounty: { type: GraphQLString },
    ward: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    updatedBy: { type: GraphQLID },
    createdAt: { type: GraphQLString }
  })
});

const ussdType = new GraphQLObjectType({
  name: 'Ussd',
  fields: () => ({
    id: { type: GraphQLID },
    userId: { type: GraphQLID },
    user: {
      type: userType,
      async resolve(parent, args) {
        return await usersController.getUserById({ userid: parent.userId });
      }
    },
    farmer: {
      type: farmerType,
      async resolve(parent, args) {
        return await farmerController.getFarmerById({ id: parent.userId });
      }
    },
    phone: { type: GraphQLString },
    userType: { type: GraphQLString },
    pin: { type: GraphQLString },
    token: { type: GraphQLString },
    pinStatus: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString }
  })
});

const sessionType = new GraphQLObjectType({
  name: 'Session',
  fields: () => ({
    id: { type: GraphQLID },
    serviceCode: { type: GraphQLString },
    userId: { type: GraphQLString },
    sessionId: { type: GraphQLString },
    level: { type: GraphQLInt },
    sublevel: { type: GraphQLInt },
    data: { type: GraphQLString },
    regstatus: { type: GraphQLBoolean },
    assessedstatus: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString }
  })
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: userType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await usersController.getUserById(args);
      }
    },
    users: {
      type: new GraphQLList(userType),
      async resolve(parent, args) {
        return await usersController.getUsers();
      }
    },
    cow: {
      type: cowType,
      args: { cowid: { type: GraphQLID }, farmerid: { type: GraphQLID } },
      async resolve(parent, args) {
        return await livestockController.getLivestock(args);
      }
    },
    cows: {
      type: new GraphQLList(cowType),
      args: { farmerid: { type: GraphQLID } },
      async resolve(parent, args) {
        return await livestockController.getLivestockByFarmerId(args);
      }
    },
    issue: {
      type: issueType,
      args: { issueid: { type: GraphQLID } },
      async resolve(parent, args) {
        return await issuesController.getIssueById(args);
      }
    },
    issues: {
      type: new GraphQLList(issueType),
      args: {},
      async resolve(parent, args) {
        return await issuesController.getIssues();
      }
    },
    unresolvedissues: {
      type: new GraphQLList(issueType),
      args: {},
      async resolve(parent, args) {
        return await issuesController.getUndoneIssues();
      }
    },
    counties: {
      type: new GraphQLNonNull(new GraphQLList(countyType)),
      async resolve(parent, args) {
        return await countiesController.getCounties();
      }
    },
    wards: {
      type: new GraphQLList(wardType),
      args: {
        subCounty: { type: GraphQLString }
      },
      async resolve(parent, args) {
        return await wardController.getWards(args);
      }
    },
    subcounties: {
      type: new GraphQLList(subcountyType),
      args: { county: { type: GraphQLString } },
      async resolve(parent, args) {
        return await subcountyController.getSubCounties(args);
      }
    },
    farmer: {
      type: farmerType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await farmerController.getFarmerById(args);
      }
    },
    farmers: {
      type: new GraphQLList(farmerType),
      args: {},
      async resolve(parent, args) {
        return await farmerController.getAllFarmers();
      }
    },
    brecord: {
      type: breedType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await breedingController.getSingleBreed(args);
      }
    },
    brecords: {
      type: new GraphQLList(breedType),
      args: { farmerId: { type: GraphQLID }, livestockId: { type: GraphQLID } },
      async resolve(parent, args) {
        return await breedingController.getAllFarmerBrecords(args);
      }
    },
    hrecord: {
      type: healthType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await healthController.getrecordById(args);
      }
    },
    hrecords: {
      type: new GraphQLList(healthType),
      args: { farmerId: { type: GraphQLID }, livestockId: { type: GraphQLID } },
      async resolve(parent, args) {
        return await healthController.getAllFarmerHrecords(args);
      }
    },
    msg: {
      type: msgType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await messageController.getMessageById(args);
      }
    },
    msgs: {
      type: new GraphQLList(msgType),
      args: {},
      async resolve(parent, args) {
        return await messageController.getAllMessages();
      }
    },
    ussd: {
      type: ussdType,
      args: { phone: { type: GraphQLString } },
      async resolve(parent, args) {
        return await ussdController.getUserByPhone(args);
      }
    },
    session: {
      type: sessionType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await sessiionController.getUssdSessionById(args);
      }
    },
    sessions: {
      type: new GraphQLList(sessionType),
      args: {},
      async resolve(parent, args) {
        return await sessiionController.getUssdSessions(args);
      }
    },
    ussds: {
      type: new GraphQLList(ussdType),
      args: {},
      async resolve(parent, args) {
        return await ussdController.getUssdUsers();
      }
    },
    alert: {
      type: alertsType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await alertController.getSingleAlert(args);
      }
    },
    alerts: {
      type: new GraphQLList(alertsType),
      args: {},
      async resolve(parent, args) {
        return await alertController.getUnactionAlerts();
      }
    },
    action: {
      type: actionType,
      args: { actionid: { type: GraphQLID } },
      async resolve(parent, args) {
        return await actionController.getActionByActionId(args);
      }
    },
    followup: {
      type: followType,
      args: { healthId: { type: GraphQLID } },
      async resolve(parent, args) {
        return await followupController.getByHealthId(args);
      }
    },
    followups: {
      type: new GraphQLList(followType),
      args: {},
      async resolve(parent, args) {
        return await followupController.getAllFollowups();
      }
    }
  }
});

// Define Mutations
const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: userType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        phone: { type: GraphQLString },
        email: { type: GraphQLString },
        department: { type: GraphQLString },
        password: { type: GraphQLString },
        isAdmin: { type: GraphQLBoolean },
        gender: { type: GraphQLString },
        county: { type: GraphQLString },
        subCounty: { type: GraphQLString },
        ward: { type: GraphQLString }
      },
      async resolve(args) {
        const user = await usersController.addUser(args);
        return user;
      }
    },
    editUser: {
      type: userType,
      args: {},
      async resolve(args) {
        return '';
      }
    }
    // deleteCar: {
    //   type: carType,
    //   args: {},
    //   async resolve(args) {
    //     return '';
    //   }
    // }
  }
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
});
