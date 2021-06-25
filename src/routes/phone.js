require('dotenv').config();
const ussdController = require('../controllers/ussdController');

const optsPhone = {
  schema: {
    description:
      'Phone Number verification Endpoint Route for DigiVet mobile App',
    tags: ['phone'],
    body: {
      type: 'object',
      required: ['phone', 'deviceId'],
      properties: {
        phone: {
          type: 'string',
          maxLength: 10,
          minLength: 10
        },
        deviceId: { type: 'string' }
      }
    },

    response: {
      200: {
        description: 'Successful Phone Number Verification',
        type: 'object',
        properties: {
          status: { type: 'string' },
          data: {
            type: 'object',
            properties: { phoneNo: { type: 'string' } }
          }
        }
      },

      404: {
        description: 'Error Response Phone not Registered',
        type: 'object',
        properties: {
          status: { type: 'string' },
          message: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              phoneNo: { type: 'string' },
              Token: { type: 'string' }
            }
          }
        }
      }
    }
  }
};

module.exports = async function (fastify, opts, done) {
  fastify.post('/phone', optsPhone, async (request, reply) => {
    const { phone, deviceId } = request.body;
    const registeredPhone = `254${phone.slice(1)}`;
    const ussdUser = await ussdController.getUserByPhone({
      phone: registeredPhone
    });
    if (!ussdUser) {
      // generate token for use in registration
      const token = await fastify.jwt.sign(
        {
          id: deviceId,
          phoneNo: phone
        },
        { expiresIn: '12H' }
      );
      reply.code(404);
      reply.send({
        status: 'error',
        message: 'User with the phone Number is not registered',
        data: { phoneNo: phone, Token: token }
      });
    } else {
      // phone registered proceed to input pin page
      reply.code(200);
      reply.send({
        status: 'success',
        data: { phoneNo: phone }
      });
    }
  });
  done();
};
