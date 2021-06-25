require('dotenv').config();
const ussdController = require('../controllers/ussdController');

const optsCheck = {
  schema: {
    description: 'Authentication Endpoint Route for DigiVet App',
    tags: ['Auth'],
    body: {
      type: 'object',
      required: ['token', 'deviceId'],
      properties: {
        token: {
          type: 'string'
        },
        deviceId: { type: 'string' }
      }
    },

    response: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: { Token: { type: 'string' } }
          }
        }
      },
      400: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          message: { type: 'string' }
        }
      }
    }
  }
};

module.exports = async function (fastify, opts, done) {
  fastify.post(
    '/check',
    { schema: optsCheck, preValidation: [fastify.authenticate] },
    async (request, reply) => {
      const { token, deviceId } = request.body;
      const decoded = fastify.jwt.verify(token);
      if (decoded && decoded.id === deviceId) {
        const user = await ussdController.getUserByDeviceId({
          id: decoded.id
        });

        if (user && token === user.token) {
          reply.code(200);
          reply.send({
            status: 'success',
            data: { userId: user.id, Token: token }
          });
        } else {
          reply.code(400);
          reply.send({
            status: 'error',
            message: 'Invalid token'
          });
        }
      } else {
        reply.code(400);
        reply.send({
          status: 'error',
          message: 'Invalid token'
        });
      }
    }
  );
  done();
};
