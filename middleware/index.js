const express = require('express');

const middlewareCross = require('./cross');
const middlewareRateLimit = requrie('express-rate-limit');

const apiChat = require('./chat');
const apiCode = require('./code');
const apiRegister = require('./register');
const apiLogin = require('./login');

module.exports = app => {
    app.use('*', middlewareCross);
    app.use(middlewareRateLimit({
        windowMs: 60 * 1000, // 一分钟
        max: 100, // 最大请求数量
    }));
    app.use(express.json());
    app.use('/chat', apiChat);
    app.use('/code', apiCode);
    app.use('/register', apiRegister);
    app.use('/login', apiLogin);
}