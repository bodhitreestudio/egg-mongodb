'use strict';

const mongodb = require('./lib/mongodb');

module.exports = agent => {
  if (agent.config.mongodb.agent) mongodb(agent);
};
