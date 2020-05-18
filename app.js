'use strict';

const mongodb = require('./lib/mongodb');

module.exports = app => {
  if (app.config.mongodb.app) mongodb(app);
};
