const express = require('express');
const { check, validationResult } = require('express-validator');
const { auth } = require('../model/mongodb');
const apiSendCode = express.Router();
const sendmail = require('../src/sendmail');
const redisClient = require('../model/redis');

// The func to generate verify code
const generateCode = () => String(Math.floor(Math.random() * 1000000)).padEnd(6, '0');

apiSendCode.post('/',
[
  check('email').isEmail().withMessage('Invalid email')
                // Verify whether is existed
                .custom(async (email) => {
                  const findResult = await auth.find({email: email});
                  if(!findResult) return Promise.reject('Email already exist');
                })
],
async (req, res) => {
  // To verify valid of the email
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // The verify code is sending to user with own QQ Mail and set which in redis
  const email = req.body.email;
  const code = generateCode();
  if(await sendmail(email, code)) {
    redisClient.set(email, code);
    redisClient.expire(email, 60 * 10); // 10 minute
    res.send({ message: 'Verify code is sended'})
  }
  else res.status(500).json({message: 'Failed to send code'});
})

module.exports = apiSendCode;