require('dotenv').config();
const Bcrypt = require('bcryptjs');
const ussdController = require('../controllers/ussdController');

const optslogin = {
  schema: {
    description: 'Login Endpoint Route for DigiVet mobile App',
    tags: ['login'],
    body: {
      type: 'object',
      required: ['phone', 'pin', 'deviceId'],
      properties: {
        phone: {
          type: 'string',
          maxLength: 10,
          minLength: 10
        },
        pin: { type: 'string', maxLength: 4, minLength: 4 },
        deviceId: { type: 'string' }
      }
    },

    response: {
      200: {
        description: 'Successful Login',
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: { user: { type: 'string' }, Token: { type: 'string' } }
          }
        }
      },

      400: {
        description: 'Error Response',
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
  fastify.post('/applogin', optslogin, async (request, reply) => {
    const { phone, pin, deviceId } = request.body;
    const registeredPhone = `254${phone.slice(1)}`;
    const ussdUser = await ussdController.getUserByPhone({
      phone: registeredPhone
    });
    if (!ussdUser) {
      reply.code(404);
      reply.send({
        status: 'error',
        message: 'User with the phone Number is not registered'
      });
    }
    if (Bcrypt.compareSync(pin, ussdUser.pin)) {
      // generate token for these valid user
      const token = await fastify.jwt.sign(
        {
          id: deviceId,
          userId: ussdUser.userType
        },
        { expiresIn: process.env.expiryApp }
      );

      await ussdController.updateussdUser({
        updateData: { token: token, deviceId: deviceId },
        id: ussdUser.id
      });

      // todo encyptr userId before reply
      reply.code(200);
      reply.send({
        status: 'success',
        data: { user: ussdUser.userType, Token: token }
      });
    } else {
      reply.code(401);
      reply.send({
        status: 'error',
        message: 'Either Phone number or Pin is incorrect'
      });
    }
  });
  done();
};
