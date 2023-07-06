const { createClient } = require('redis');
const colors = require('colors-console');
const { redisConf } = require('../conf/dbConf');

const client = createClient({
  url: redisConf.url
});
client.on('error', err => console.log(colors('red', 'Redis:'), 'Redis Client Error', err));

client.connect();

module.exports = client;