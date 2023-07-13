const middlewareJwt = require('express-jwt');

module.exports = middlewareJwt.expressjwt({
  secret: require('../conf/deployConf').secret,
  algorithms: ["HS256"]
}).unless({
  path: [
    '/code',
    '/register',
    '/login/code',
    '/login/pwd'
  ]
});