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
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    server.log.info('MongoDB connected...');
  })
  .catch((err) => {
    server.log.error(err);
  });

server.listen(process.env.PORT || 3001, '0.0.0.0', (err) => {
  server.swagger();
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
