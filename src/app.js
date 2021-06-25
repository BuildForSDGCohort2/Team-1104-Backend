require('dotenv').config();
const fastify = require('fastify');
const { ApolloServer } = require('apollo-server-fastify');
const fastifyjwt = require('fastify-jwt');
const helmet = require('fastify-helmet');
const fastifyswagger = require('fastify-swagger');
const cors = require('fastify-cors');
const formBody = require('fastify-formbody');

const { makeExecutableSchema } = require('@graphql-tools/schema');
const swagger = require('./config/swagger');
const yup = require('yup');

// Import GraphQL Schema
// const schema = require('./schema/index');
const { typeDefs, resolvers } = require('./schema/index');
const ussdRoute = require('./routes/ussd');
const ussdGetRoute = require('./routes/ussdGet');
const authRoute = require('./routes/auth');
const loginRoute = require('./routes/login');
const appLoginRoute = require('./routes/appLogin');
const phoneVerificationRoute = require('./routes/phone');

const schema = makeExecutableSchema({ typeDefs, resolvers });

const yupValidation = {
  async Mutation(resolve, root, args, context, info) {
    const mutationField = info.schema.getMutationType().getFields()[
      info.fieldName
    ];
    const mutationValidationSchema = mutationField.validationSchema;

    if (mutationValidationSchema) {
      try {
        const values = await mutationValidationSchema.validate(args);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          return {
            error: error.message
          };
        } else {
          throw error;
        }
      }
    }

    return resolve(root, args, context, info);
  }
};

const server = new ApolloServer({
  schema,
  debug: false,
  context: async ({ request }) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw new Error('Token is required to query this schema');
    }
  },
  middlewares: [yupValidation]
});

function build(opts = {}) {
  const app = fastify(opts);
  // Register Apollo Server Fastify GraphQL
  app.register(server.createHandler({ path: '/api/graphql' }));

  // app.register(gql, {
  //   schema,
  //   graphiql: true
  // });

  app.register(fastifyjwt, {
    secret: process.env.secret
  });

  app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'default.example'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      },
      reportOnly: false
    }
  });

  app.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.code(401);
      reply.send({
        status: 'error',
        message: 'Jwt Token Error'
      });
    }
  });

  // Register Swagger
  app.register(fastifyswagger, swagger.options);

  app.register(cors, {
    origin: '*',
    credentials: true
  });
  app.register(formBody);

  app.get('/', (request, reply) => {
    reply
      .status(200)
      .send({ status: 'success', data: { Hello: 'DigiVet World' } });
  });

  // app.post('/graphiql', (request, reply) => {
  //   console.log(JSON.stringify(request.body));
  //   const query = 'counties { countyName}';
  //   // return app.graphql(query)
  //   reply.status(200).send(app.graphql(query));
  // });

  app.register(ussdRoute, { prefix: '/v1' });
  app.register(ussdGetRoute, { prefix: '/v1' });
  app.register(authRoute, { prefix: '/v1' });
  app.register(loginRoute, { prefix: '/api/v1' });
  app.register(appLoginRoute, { prefix: '/api/v1' });
  app.register(phoneVerificationRoute, { prefix: '/api/v1' });

  return app;
}

module.exports = build;
