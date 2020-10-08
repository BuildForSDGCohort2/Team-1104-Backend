require('dotenv').config();
const fastify = require('fastify');
const swagger = require('./config/swagger');
const gql = require('fastify-gql');

// Import GraphQL Schema
const schema = require('./schema/index');

// const fp = require('fastify-plugin');
// fp(async function (fastify) {
//   fastify.decorate('authenticate', async function (request, reply) {
//     try {
//       await request.jwtVerify();
//     } catch (err) {
//       reply.send(err);
//     }
//   });
// });

function build(opts = {}) {
  const app = fastify(opts);
  // Register Fastify GraphQL
  app.register(gql, {
    schema,
    graphiql: true
  });

  app.register(require('fastify-jwt'), {
    secret: process.env.secret
  });

  // Register Swagger
  app.register(require('fastify-swagger'), swagger.options);

  app.register(require('fastify-cors'), {
    origin: '*',
    credentials: true
  });
  app.get('/', (request, reply) => {
    reply
      .status(200)
      .send({ status: 'success', data: { Hello: 'DigiVet World' } });
  });
  app.register(require('./routes/ussd'), { prefix: '/v1' });
  app.register(require('./routes/login'), { prefix: '/api/v1' });
  app.register(require('./routes/appLogin'), { prefix: '/api/v1' });

  return app;
}

module.exports = build;
