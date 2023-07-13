const { check, validationResult } = require('express-validator');
const { User } = require('../model/mongodb');
const jwt = require('jsonwebtoken');
const apiLogin = require('express').Router();
const bcrypt = require('bcrypt');
const colors = require('colors-console');
const redisClient = require('../model/redis');

// login with email and code
apiLogin.post('/code', [
  check('email').isEmail().withMessage('Invalid email')
                .custom(async (email) => {
                  const findResult = await User.find({email: email});
                  if(!findResult) return Promise.reject('Email does not exist');
                }),
  check('code').isNumeric().withMessage('The verify code must be numberic')
               .isLength({ min: 6, max: 6 }).withMessage('The verify code must be 6 number')
],
async (req, res) => {
  // The email, password, code is verified
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  } 

  const { email, code } = req.body;
  // Verify code whether is valid
  try {
    const verifyCode = await redisClient.get(email);
    if (code === verifyCode) {
      const user = await User.findOne({email: email})
      const id = String(user._id);

      if (await redisClient.get(id) && await redisClient.ttl(id) > 60 * 60 * 24 - 60 * 5)
      return res.status(429).send({ message: 'Please try again after five minute' });

      // Generate the token
      const token = jwt.sign({ id: id }, require('../conf/deployConf').secret, { expiresIn: '24h' });
      redisClient.set(id, token);
      redisClient.expire(id, 60 * 60 * 24);

      res.send({
        message: 'Your account is logined successfully!',
        token: 'Bearer ' + token
      });

      console.log(colors('green', 'Register:'), `${email} 登录成功`);
    } else res.status(422).json({message: 'Failed to verify the code'})
  } catch (error) {
    if (error) {
      console.log(colors('red', 'Register:'), `${email} 登录过程中，系统错误\n`, error);
      return res.status(500).json({message: 'An error has occurred in login/code api'})
    }
  }
})

// login with email and password
apiLogin.post('/pwd', [
  check('email').isEmail().withMessage('Invalid email')
                .custom(async (email) => {
                  const findResult = await User.find({email: email});
                  if(!findResult) return Promise.reject('Email does not exist');
                })
], 
async (req, res) => {
  // The email, password, code is verified
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  // Verify the email and password
  const { email, password } = req.body;
  try {
    const user = await User.findOne({email: email});
    const id = String(user._id);

    // Check the passwrod
    if (!bcrypt.compareSync(password, user.password))
    return res.status(422).send({message: 'The email or password is incorrect'})

    // Check whether the CAPTCHA is repeatedly obtained for a short time
    if (await redisClient.get(id) && await redisClient.ttl(id) > 60 * 60 * 24 - 60 * 5)
    return res.status(429).send({ message: 'Please try again after five minute' });

    // Generate the token
    const token = jwt.sign({ id: id }, require('../conf/deployConf').secret, { expiresIn: '24h' });
    redisClient.set(id, token);
    redisClient.expire(id, 60 * 60 * 24);

    res.send({
    message: 'Your account is logined successfully!',
    token: 'Bearer ' + token
    });

    console.log(colors('green', 'Register:'), `${email} 登录成功`);
  } catch (error) {
    if (error) {
      console.log(colors('red', 'Register:'), `${email} 登录过程中，系统错误\n`, error);
      return res.status(500).json({message: 'An error has occurred in login/pwd api'});
    }
  }
})

module.exports = apiLogin;