const express = require('express');
const middlewareCross = express.Router();
const crossOrigin = require('../src/crossOrigin');

middlewareCross.use('/', crossOrigin);

module.exports = middlewareCross;