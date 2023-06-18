const express = require('express');
const routerAnswer = express.Router();
const tokenIsValid = require('../src/verifyToken');
const openaiAnswer = require('../src/requestOpenaiChat');

routerAnswer.post('/', tokenIsValid);
routerAnswer.post('/', openaiAnswer);

module.exports = routerAnswer;