const fastify = require('fastify');

function build(opts = {}) {
  const app = fastify(opts);
  app.get('/', async (request, reply) => {
    return { Hello: 'DigiVet World' };
  });

  return app;
}

module.exports = build;
