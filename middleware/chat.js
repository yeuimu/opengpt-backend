const express = require('express');
const apiChat = express.Router();
const chat = require('../src/chat');

apiChat.post('/', chat);

module.exports = apiChat;