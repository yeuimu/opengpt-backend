const express = require('express');
const middlewareChat = express.Router();
const chat = require('../src/chat');

middlewareChat.post('/', chat);

module.exports = middlewareChat;