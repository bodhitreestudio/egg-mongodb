'use strict';

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

module.exports = app => {
  app.addSingleton('mongodb', createOneClient);
};

function createOneClient(config, app) {
  assert(config.host && config.port && config.user && config.database,
    `[egg-mongodb] 'host: ${config.host}', 'port: ${config.port}', 'user: ${config.user}', 'database: ${config.database}' are required on config`);

  const dbUrl = getUrl(config);

  const mongoClient = new MongoClient(dbUrl);

  app.beforeStart(async () => {
    app.coreLogger.info(`[egg-mongodb] connecting to ${dbUrl}...`);
    await mongoClient.connect();

    // const db = mongoClient.db(config.database);

    console.log("[egg-mongodb] Connected successfully to server");
  });

  return mongoClient;
}

function getUrl (config) {

  if (config.url) {
    return config.url;
  }

  let url = 'mongodb://';

  if (config.user) {
    if (config.password) {
      url += `${config.user}:${config.password}@`;
    } else {
      url += `${config.user}@`;
    }
  }

  const hosts = config.host.toString().split(',');
  const ports = config.port.toString().split(',');

  assert(hosts.length === ports.length, '[egg-mongodb] hosts and ports length should be the same');

  const { options } = config;

  for (let i = 0; i < hosts.length; i++) {
    url += `${hosts[i]}:${ports[i]},`;
  }

  if (config.database) {
    url += `/${config.database}`;
  }

  if (options) {
    let uriOpions = '?';
    Object.keys(options).forEach(key => (uriOpions += `${key}=${options[key]}&`));
    url += uriOpions;
  }

  return url;
}

