const express = require('express');
const { check, validationResult } = require('express-validator');
const redisClient = require('../model/redis');
const { auth } = require('../model/mongodb');
const colors = require('colors-console');
const apiRegister = express.Router();

apiRegister.post('/', [
  check('email').isEmail().withMessage('Invalid email')
                .custom(async (email) => {
                  const findResult = await auth.find({email: email});
                  if(!findResult) return Promise.reject('Email already exist');
                }),
  check('password').isLength({ min: 8 }).withMessage('The password must be at least 8 chars'),
  check('code').isNumeric().withMessage('The verify code must be numberic')
               .isLength({ min: 6, max: 6 }).withMessage('The verify code must be 6 number')
], async (req, res) => {
  // The email, password, code is verified
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const email = req.body.email;
  const password = req.body.password;
  const code = req.body.code;

  // Verify code whether is valid
  try {
    const verifyCode = await redisClient.get(email);
    if (code === verifyCode) {
      const createResult = await auth.create({
        email: email,
        password: password
      })
      res.send({message: 'Your account is registered successfully!' });
      console.log(colors('green', 'Register:'), `${email} 注册成功`);
    } else res.status(422).json({message: 'Failed to verify the code'})
  } catch (error) {
    if (error) {
      console.log(colors('red', 'Register:'), `${email} 注册过程中，系统错误\n`, error);
      res.status(500).json({message: 'An error has occurred in register api'})
    }
  }
})

module.exports = apiRegister;