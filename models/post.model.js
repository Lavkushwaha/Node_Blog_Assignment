const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const PostSchema = new mongoose.Schema({
  username: {type: String, required: true },
  title: {type: String, required: true },
  content: {type: String, required: true },
  time:{type: Date, default: Date.now }

 });


module.exports = mongoose.model('Post', PostSchema, 'posts');
