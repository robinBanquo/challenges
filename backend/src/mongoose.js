const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;
  let mongoUrl =  `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

  if(process.argv[2] === 'test/'){
  
    mongoUrl = 'mongodb://127.0.0.1:27017';
  }
  console.log('mongoUrl = ', mongoUrl);
  mongoose.connect( mongoUrl ).catch(err => {
    logger.error(err);
    process.exit(1);
  });

  app.set('mongooseClient', mongoose);
};
