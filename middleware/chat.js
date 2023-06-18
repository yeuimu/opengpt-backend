const express = require('express');
const middlewareChat = express.Router();
const tokenIsValid = require('../src/verifyToken');
const openaiAnswer = require('../src/requestOpenaiChat');

middlewareChat.post('/', tokenIsValid);
middlewareChat.post('/', openaiAnswer);

module.exports = middlewareChat;