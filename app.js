const express = require('express');
const middleware = require('./middleware/index');
const { hostname, port } = require('./conf/deployConf')

const app = express();
middleware(app);

// 监听端口
app.listen(port, hostname, () => {
    console.log(`http://${hostname}:${port}`)
  });