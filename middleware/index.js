const express = require('express');
const middlewareCross = require('./cross');
const apiChat = require('./chat');
const apiCode = require('./code');
const apiRegister = require('./register');
const apiLogin = require('./login');

module.exports = app => {
    app.use('*', middlewareCross);
    app.use(express.json());
    app.use('/chat', apiChat);
    app.use('/code', apiCode);
    app.use('/register', apiRegister);
    app.use('/login', apiLogin);
}