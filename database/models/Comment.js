const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  comment: String,
  post: [{
    type: Schema.Types.ObjectId, ref: 'Post',
  }],
  parentComment:{
    type: Schema.Types.ObjectId, ref: 'Comment',
  },
  childComment:[{
    type: Schema.Types.ObjectId, ref: 'Comment',
  }]
});

module.exports = mongoose.model('Comment', commentSchema);