const mongoose = require('mongoose');



const FollowSchema = new mongoose.Schema({
  who: {type: String, required: true},
  whom: {type: String, required: true},
  
});



module.exports = mongoose.model('Follow', FollowSchema, 'followers');
