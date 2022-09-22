const mongoose = require('mongoose');
/*
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;
*/
  const MONGO_USERNAME = 'mongo';
  const MONGO_PASSWORD = 'mongo';
  const MONGO_HOSTNAME = '127.0.0.1';
  const MONGO_PORT = '27017';
  const MONGO_DB = 'ddseln_lab_s5';
/*
const options = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
};
*/

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

/*
mongoose.connect(url, options).then( function() {
    console.log('MongoDB is connected');
  })
    .catch( function(err) {
    console.log(err);
  });
*/

mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});
