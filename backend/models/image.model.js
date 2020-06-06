const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  filename: String,
  contentType: String,
  uploadDate: Date,
});

const Image = mongoose.model('Image', imageSchema, 'uploads.files');

module.exports = Image;
