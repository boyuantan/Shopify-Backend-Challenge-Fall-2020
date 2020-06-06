const crypto = require('crypto');
const router = require('express').Router();

let User = require('../models/user.model');

// Use random character string as salt
var genSalt = function(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// Using SHA512
var sha512 = function(password, salt) {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt: salt,
    pwdHash: value,
  }
}

function genSaltedHash(password) {
  var salt = getRandomString(16);
  var passwordData = sha512(password, salt);
}

// router.route('/').get((req, res) => {
//   User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/register').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const newUser = new User({username, password});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }, (err, user) => {
    if (err) throw err;

    user.comparePassword(password, (err, isMatch) => {
      if (err) throw err;
      console.log(password, ': ', isMatch);
    });
  });
});

module.exports = router;
