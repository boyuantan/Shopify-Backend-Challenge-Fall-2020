const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: can save associated expiry time for cleanup
const tokenBlacklistSchema = new Schema({
  token: String,
});

// Exports
const BlacklistToken = mongoose.model('BlacklistToken', tokenBlacklistSchema);
module.exports = BlacklistToken;
