const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


const TokenSchema = new mongoose.Schema({
  token: {type: String, required: true, index: {unique: true}},
  username: {type: String, required: true},
});

TokenSchema.plugin(uniqueValidator, {message: 'token exists'});

module.exports = mongoose.model('Token', TokenSchema, 'tokens');
