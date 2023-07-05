const express = require('express');
const { check, validationResult } = require('express-validator');
const { auth } = require('../model/mongodb');
const apiSendCode = express.Router();
const sendmail = require('../src/sendmail')

apiSendCode.post('/',
[
  check('email').isEmail().withMessage('Invalid email')
                .custom(async (email) => {
                  const findResult = await auth.find({email: email});
                  if(!findResult) return Promise.reject('Email already exist');
                })
],
async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const email = req.body.email;
  if(await sendmail(email)) res.send({ message: 'Verify code is sended'})
  else res.status(500).json({message: 'Failed to send code'});
})

module.exports = apiSendCode;