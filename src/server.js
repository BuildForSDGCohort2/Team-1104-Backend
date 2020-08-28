// Require the fastify framework and instantiate it
const fastify = require('fastify')({
  logger: true
});
//Database connection
module.exports = fastify;
