# egg-mongodb

> Egg plugin for official mongodb nodejs driver [node-mongodb-native](https://github.com/mongodb/node-mongodb-native).

## Install

```bash
$ npm i egg-mongodb --save
```

## Enable Plugin

```js
// {app_root}/config/plugin.js
exports.mongodb = {
  enable: true,
  package: 'egg-mongodb',
};
```

## Configuration

### Single Instance

```js
// {app_root}/config/config.default.js
exports.mongodb = {
  client: {
    host: 'host',
    port: 'port',
    database: 'mydb',
    user: 'user',
    password: 'password',
    options: {},

    // or simply with url:
    url: "mongodb://composer:Pwd123@localhost:27017/appDb"
  },
};
```

### Replica Set

```js
// mongodb://host1:port1,host2:port2/mydb?replicaSet=test
exports.mongodb = {
  client: {
    // simply with url:
    url: "..."

    // or
    host: 'host1,host2',
    port: 'port1,port2',
    database: 'mydb',
    options: {
      replicaSet: 'test',
    },
  },
};

// mongodb://host:port1,host:port2/mydb?replicaSet=test
exports.mongodb = {
  client: {
    host: 'host', // or ['host']
    port: 'port1,port2', // or ['port1', 'port2']
    database: 'mydb',
    options: {
      replicaSet: 'test',
    },
  },
};
```

### Multiple Instances

> **Can not set `client` and `clients` both.**

```js
// {app_root}/config/config.default.js
exports.mongodb = {
  clients: {
    db1: {
      host: 'host',
      port: 'port',
      database: 'db1',
      user: 'user',
      password: 'password',
      options: {},
    },
    db2: {
      host: 'host',
      port: 'port',
      database: 'db2',
      user: 'user',
      password: 'password',
      options: {},
    },
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

The APIs provided by plugin usually need two arguments. The first is commonly
the collection name, and the second is an object keeps the arguments of official
API. For example, to insert one document using official API

```js
db.collection('name').insertOne(doc, options);
```

and using plugin API

```js
const args = { doc, options };
app.mongodb.insertOne('name', args);
```

**For Multiple Instances**

```js
const args = { doc, options };
app.mongodb.get('db1').insertOne('name', args);
```

The `args` is an object provides the arguments to official API.

## License

[MIT](LICENSE)
