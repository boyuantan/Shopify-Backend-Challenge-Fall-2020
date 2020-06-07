const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const imageSchema = new Schema({
  userId: ObjectId,
  fileId: ObjectId,
  filename: String, // could be problematic
  isPrivate: Boolean,
});

// Exports
const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
