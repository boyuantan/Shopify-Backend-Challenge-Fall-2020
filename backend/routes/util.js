const jwt = require('jsonwebtoken');
let BlacklistToken = require('../models/blacklist.model');

require('dotenv').config();

const jwtKey = process.env.JWT_PRIVATE_KEY;

function getTokenPayload(req, callback) {
  const token = req.cookies.token;
  if (!token) {
    callback(null);
    return;
  }

  BlacklistToken.findOne({ token: token }, (err, blacklistToken) => {
    if (blacklistToken || err) {
      callback(null);  // Error or token blacklisted
      return;
    }

    var payload;
    try {
      payload = jwt.verify(token, jwtKey);
    } catch (e) {
      callback(null);
      return;
    }

    callback(payload);
  });
}

module.exports = getTokenPayload;
