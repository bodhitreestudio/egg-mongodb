'use strict';

const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

let count = 0;

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
    await client.connect();

    //const db = mongoClient.db(dbName);
    console.log("[egg-mongodb] Connected successfully to server");
  });

  return mongoClient;
}

function getUrl (config) {
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

  asset(hosts.length === ports.length, '[egg-mongodb] hosts and ports length should be the same');

  const { options } = config;

  for (let i = 0; i < hosts.length; i++) {
    url += `${hosts[i]}:${ports[i]},`;
  }

  //url += `/${config.database}`;

  if (options) {
    let uriOpions = '?';
    Object.keys(options).forEach(key => (uriOpions += `${key}=${options[key]}&`));
    url += uriOpions;
  }

  return url;
}
