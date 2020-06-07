const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const getTokenPayload = require('./util');

require('dotenv').config();

let User = require('../models/user.model');
let BlacklistToken = require('../models/blacklist.model');

const jwtKey = process.env.JWT_PRIVATE_KEY;
const jwtExpirySeconds = 300;

router.route('/register').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new User({username, password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').get((req, res) => {
  getTokenPayload(req, (payload) => {
    if (!payload) {
      console.log("didn't find payload");
      return res.status(401).send();
    }

    const username = payload.username;
    const password = payload.password;

    User.findOne({ username: username }, (err, user) => {
      if (!user || err) {
        console.log("no user found");
        return res.status(401).send();
      }
      
      return res.status(200).json({
        username: username,
      });
    });
  });
});

router.route('/login').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, (err, user) => {
    if (!user || err) {
      return res.status(401).json('Error: ' + err);
    }

    console.log(user);
    user.comparePassword(password, (err, isMatch) => {
      if (err) return res.status(500).json('Error: ' + err);
      if (!isMatch) return res.status(401).json('Error: Incorrect password!');

      const token = jwt.sign({username}, jwtKey, {
        algorithm: "HS256",
        expiresIn: jwtExpirySeconds,
      });

      console.log("token: ", token)
      // maxAge in milliseconds
      res.cookie("token", token, {maxAge: jwtExpirySeconds * 1000});
      return res.status(200).send();
    });
  });
});

router.route('/logout').get((req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(200).json('User was not logged in.');
  }

  // Should probably check for token validity
  const blacklistToken = new BlacklistToken({ token: token });
  blacklistToken.save()
    .then(() => res.json('User successfully logged out.'))
    .catch(err => res.status(500).json('Error: ' + err));
});

module.exports = router;
