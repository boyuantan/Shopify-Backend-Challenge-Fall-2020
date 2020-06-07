const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

require('dotenv').config();

let User = require('../models/user.model');

// Use random character string as salt
// var genSalt = function(length) {
//   return crypto.randomBytes(Math.ceil(length / 2))
//     .toString('hex')
//     .slice(0, length);
// }
//
// // Using SHA512
// var sha512 = function(password, salt) {
//   var hash = crypto.createHmac('sha512', salt);
//   hash.update(password);
//   var value = hash.digest('hex');
//   return {
//     salt: salt,
//     pwdHash: value,
//   }
// }
//
// function genSaltedHash(password) {
//   var salt = getRandomString(16);
//   var passwordData = sha512(password, salt);
// }

// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

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

router.route('/login').post((req, res) => {
  console.log("request: ", req.body);
  const username = req.body.username;
  const password = req.body.password;

  console.log("username: ", username);
  console.log("password: ", password);

  User.findOne({ username: username }, (err, user) => {
    if (err) {
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
      res.end();
    });
  });
});

module.exports = router;
