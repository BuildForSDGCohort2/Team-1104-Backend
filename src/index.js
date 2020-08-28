require('dotenv').config();

// Import Server
const fastify = require('./server.js');
const Port = process.env.PORT || 3001;

// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen(Port);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
