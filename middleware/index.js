const middlewareJson = require('express').json();
const middlewareCross = require('./cross');
const middlewareRateLimit = require('./ratelimit');
const middlewareJwt = require('./jwt');
const middlewareError = require('./error');

const apiChat = require('./chat');
const apiCode = require('./code');
const apiRegister = require('./register');
const apiLogin = require('./login');

module.exports = app => {
    app.use(middlewareCross);
    app.use(middlewareRateLimit);
    app.use(middlewareJson);
    app.use(middlewareJwt);
    app.use('/code', apiCode);
    app.use('/register', apiRegister);
    app.use('/login', apiLogin);
    app.use('/chat', apiChat);
    app.use('/test', require('../test/test-token'));
    app.use(middlewareError);
}