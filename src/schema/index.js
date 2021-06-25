// Import External Dependancies
const { gql } = require('apollo-server-fastify');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const yup = require('yup');

const helper = require('../helpers/helpers');
const msg = require('../helpers/sendMessage');

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
const typeDefs = gql`
  scalar Date
  type Counties {
    id: String
    countyCode: String
    countyName: String!
  }

  type SubCounties {
    id: String
    subCountyName: String
    countyName: String
  }

  type Wards {
    id: String
    subCountyName: String
    wardName: String
  }

  type Farmer {
    id: String
    farmerNo: String
    firstName: String
    lastName: String
    phone: String
    county: String
    subCounty: String
    ward: String
    assessed: Boolean
    assessedBy: String
    assessedDate: Date
    farmName: String
    isActive: Boolean
    age: String
    gender: String
    createdAt: Date
  }

  type NewFarmer {
    firstName: String
    lastName: String
    phone: String
    county: String
    subCounty: String
    ward: String
    gender: String
  }

  type Query {
    counties: [Counties]
    subcounties: [SubCounties]
    countysubcounties(countyName: String!): [SubCounties]
    subcountyWards(subCountyName: String!): [Wards]
    wards: [Wards]
    farmers: [Farmer]
    farmer(id: String!): [Farmer]
  }

  type Mutation {
    addFarmer(
      firstName: String!
      lastName: String!
      phone: String!
      county: String!
      subCounty: String!
      ward: String!
      gender: String!
      deviceId: String!
    ): Farmer
  }
`;

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    }
  }),
  Query: {
    counties: () => {
      return countiesController.getCounties();
    },
    subcounties: () => {
      return subcountyController.getAllSubCounties();
    },
    countysubcounties: (root, args, context, info) => {
      return subcountyController.getSubCounties({ county: args.countyName });
    },
    subcountyWards: (root, args, context, info) => {
      return wardController.getWards({ subCounty: args.subCountyName });
    },
    wards: () => {
      return wardController.getAllWards();
    },
    farmers: () => {
      return farmerController.getAllFarmers();
    },
    farmer: (root, args, context, info) => {
      return farmerController.getFarmerById({ id: args.id });
    }
  },

  Mutation: {
    // 1
    addFarmer: {
      validationSchema: yup.object().shape({
        firstName: yup
          .string()
          .trim()
          .matches(/^[a-zA-Z]+$/, 'Invalid first name')
          .required()
          .min(3, 'First name is too short'),
        lastName: yup
          .string()
          .trim()
          .matches(/^[a-zA-Z\s]+$/, 'Invalid last name')
          .required()
          .min(3, 'Last name is too short'),
        phone: yup
          .string()
          .required()
          .matches(/^0[0-9]{9}$/, 'Invalid phone number'),
        county: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, 'Invalid County name')
          .required(),
        subCounty: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, 'Invalid County name')
          .required(),
        ward: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, 'Invalid County name')
          .required(),
        gender: yup
          .string()
          .matches(/^[a-zA-Z\s]+$/, 'Invalid County name')
          .required(),
        deviceId: yup.string().required()
      }),
      resolve: async (root, args, context, info) => {
        const farmer = {
          firstName: helper.toTitleCase(args.firstName),
          lastName: helper.toTitleCase(args.lastName),
          phone: `'254'${args.phone}`,
          county: helper.toTitleCase(args.county),
          subCounty: helper.toTitleCase(args.subCounty),
          ward: helper.toTitleCase(args.ward),
          gender: helper.toTitleCase(args.gender)
        };

        const newFarmer = await farmerController.addFarmer(farmer);

        if (newFarmer) {
          const pin = helper.generateRandomString(4);
          const ussdRegistration = await ussdController.addussdUser({
            userId: newFarmer.id,
            pin: pin,
            phone: farmer.phone,
            userType: 'Farmer'
          });
          if (ussdRegistration) {
            const msgToSend = `Welcome to digivet services, you have been successfully registered, your pin is ${pin}`;
            const sendMsg = await msg.sendMessage({
              sendTo: '254722395251',
              message: msgToSend
            });

            if (sendMsg) {
              return newFarmer;
            }
          }
        }

        return farmerController.addFarmer(newFarmer);
      }
    }
  }
};

module.exports = { typeDefs, resolvers };
