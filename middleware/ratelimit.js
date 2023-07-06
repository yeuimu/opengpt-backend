const middlewareRateLimit = require('express-rate-limit');

module.exports = middlewareRateLimit({
  windowMs: 60 * 1000, // 一分钟
  max: 100, // 最大请求数量
})