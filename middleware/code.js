const express = require('express');
const { check, validationResult } = require('express-validator');
const { auth } = require('../model/mongodb');
const apiSendCode = express.Router();
const sendmail = require('../src/sendmail');
const redisClient = require('../model/redis');
const colors = require('colors-console');

// The func to generate verify code
const generateCode = () => String(Math.floor(Math.random() * 1000000)).padEnd(6, '0');

apiSendCode.post('/',
[
  check('email').isEmail().withMessage('Invalid email')
],
async (req, res) => {
  // To verify valid of the email
  if (!validationResult(req).isEmpty())
  return res.status(422).json({ errors: errors.array() });

  const email = req.body.email;

  // Check whether the CAPTCHA is repeatedly obtained for a short time
  if (await redisClient.get(email) && await redisClient.ttl(email) > 60 * 9)
  return res.status(429).send({ message: 'Please try again after one minute' });

  // The verify code is sending to user with own QQ Mail and set which in redis
  const code = generateCode();
  try {
    if(await sendmail(email, code)) {
      redisClient.set(email, code);
      redisClient.expire(email, 60 * 10); // 10 minute
      res.send({ message: 'Verify code is sended'})
    } else res.status(500).json({message: 'Failed to send code'}); 
  } catch (error) {
    if (error) {
      console.log(colors('red', 'Code:'), `${email} 验证码发送过程中，系统错误\n`, error);
      return res.status(500).json({message: 'An error has occurred in code api'})
    }
  }
})

module.exports = apiSendCode;