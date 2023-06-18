const express = require('express');
const middlewareCross = require('./cross');
const middlewareChat = require('./chat');

module.exports = app => {
    app.use('*', middlewareCross);
    app.use(express.json());
    app.use('/chat', middlewareChat);
}