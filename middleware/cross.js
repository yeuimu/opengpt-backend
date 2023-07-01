const express = require('express');
const middlewareCross = express.Router();
const crossOrigin = require('../src/cross');

middlewareCross.use('/', crossOrigin);

module.exports = middlewareCross;