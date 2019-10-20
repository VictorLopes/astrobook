var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var userSchema = new Schema({
  name: String,
  lastNamse: String,
  nickname: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  profilePhoto: String
});

userSchema.plugin(timestamps);

module.exports = mongoose.model('User', userSchema);