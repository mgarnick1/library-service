var mongoose = require('mongoose');
var LibrarySchema = new mongoose.Schema({
  Cover: String, //Base64 Encoded
  Title: String,
  Author: String,
  Number_Of_Pages: Number,
  Publish_Date: Date,
  Synopsis: String,
  Rating: String,
  Delete: String
});


mongoose.model('Library', LibrarySchema);

module.exports = mongoose.model('Library');
