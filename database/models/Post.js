const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: String,
  subtitle: String,
  content: String,
  username: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Post', PostSchema);


