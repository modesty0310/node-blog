const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: [true, '제목을 입력해 주세요.'],
  },
  content: {
    type: String,
    required: [true, '내용을 입력해 주세요.'],
  },
  username: {
    type: String,
    required: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

PostSchema.index({ title: 'text', content: 'text' })
module.exports = mongoose.model('Post', PostSchema);


