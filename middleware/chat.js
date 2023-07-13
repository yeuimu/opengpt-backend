const express = require('express');
const apiChat = express.Router();

apiChat.post('/', (req, res) => {
  const { messages } = req.body;
  return res.send(messages);
});

module.exports = apiChat;