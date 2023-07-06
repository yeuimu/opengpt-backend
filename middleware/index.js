const middlewareJson = require('express').json();
const middlewareCross = require('./cross');
const middlewareRateLimit = require('./ratelimit');

const apiChat = require('./chat');
const apiCode = require('./code');
const apiRegister = require('./register');
const apiLogin = require('./login');

module.exports = app => {
    app.use(middlewareCross);
    app.use(middlewareRateLimit);
    app.use(middlewareJson);
    app.use('/chat', apiChat);
    app.use('/code', apiCode);
    app.use('/register', apiRegister);
    app.use('/login', apiLogin);
}