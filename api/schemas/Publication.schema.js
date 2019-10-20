var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var timestamps = require('mongoose-timestamp');

var publicationSchema = new Schema({
  title: String,
  description: String,
  cover: String,
  photos: [{ type: String }],
  comments: [new Schema({
    user: String,
    message: String
  })]
});

publicationSchema.plugin(timestamps);

module.exports = mongoose.model('Publication', publicationSchema);