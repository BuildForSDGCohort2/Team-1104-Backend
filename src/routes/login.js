'use strict';
require('dotenv').config();
const Bcrypt = require('bcryptjs');
const userController = require('../controllers/usersController');

const optslogin = {
  schema: {
    description: 'Login Endpoint Route for DigiVet Admin',
    tags: ['login'],
    body: {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          format: 'email'
        },
        password: { type: 'string' }
      }
    },

    response: {
      200: {
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
  fastify.post('/login', optslogin, async (request, reply) => {
    const { email, password } = request.body;
    const user = await userController.getUserByEmail({
      email: email
    });

    if (user && Bcrypt.compareSync(password, user.password)) {
      // generate token for these valid user
      const token = await fastify.jwt.sign({
        user: user.id,
        expiresIn: process.env.expiryWeb
      });
      await userController.updateUser({
        updateData: { token: token },
        id: user.id
      });
      // todo encyptr userId before reply
      reply.code(200);
      reply.send({
        status: 'success',
        data: { userId: user.id, Token: token }
      });
    } else {
      reply.code(401);
      reply.send({
        status: 'error',
        message: 'Either Email or Password is incorrect'
      });
    }
  });
  done();
};
