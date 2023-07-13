const colors = require("colors-console");
const { UnauthorizedError } = require('express-jwt');

module.exports = function middlewareError(err, req, res, next){
  if (err instanceof UnauthorizedError) {
    switch(err.code) {
      case 'credentials_required':
        return res.status(401).json({message: 'No authorization token was found'});
      case 'invalid_token':
        return res.status(401).json({message: 'Invalid token'});
      default:
        return res.status(err.status).json(err.inner);
    }
  } else {
    console.log(colors('red', 'Express:'), '系统出现问题\n', err);
    return res.status(500).json({message: 'No authorization token was found'});
  }
}