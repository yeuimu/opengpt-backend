const { createClient } = require('redis');
const colors = require('colors-console');

const client = createClient();
client.on('error', err => console.log(colors('red', 'Redis:'), 'Redis Client Error', err));

client.connect();

module.exports = client;