const fastify = require('fastify');

function build(opts = {}) {
  const app = fastify(opts);
  // eslint-disable-next-line no-unused-vars
  app.get('/', async (request, reply) => {
    return { Hello: 'DigiVet World' };
  });

  return app;
}

module.exports = build;
