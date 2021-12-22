const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
  text: String,
  post: [{
    type: Schema.Types.ObjectId, ref: 'Post',
  }],
  author:{type:Schema.Types.ObjectId, ref:'User', required:true},
  parentComment:{
    type: Schema.Types.ObjectId, ref: 'Comment',
  },
  childComment:[{
    type: Schema.Types.ObjectId, ref: 'Comment',
  }],
  createdAt:{type:Date, default:Date.now},
  updatedAt:{type:Date},
});

module.exports = mongoose.model('Comment', commentSchema);