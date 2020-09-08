require('dotenv').config();
// Require external modules
const mongoose = require('mongoose');
// Require the fastify framework and instantiate it
const server = require('./app')({
  logger: {
    level: 'info',
    prettyPrint: true
  }
});

// Connect to DB
mongoose
  .connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(process.env.PORT || 3001, '0.0.0.0', (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

// const start = async () => {
//   try {
//     await fastify.listen(process.env.PORT || 3001, '0.0.0.0');
//     fastify.log.info(`server listening on ${fastify.server.address().port}`);
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };
// start();
// module.exports = fastify;
