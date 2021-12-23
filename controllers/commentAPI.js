const Comment = require('../database/models/Comment');
const Post = require('../database/models/Post');

exports.createComment = async (req, res) => {
  const user = req.user._id;
  const postId =req.params.id;
  console.log(req.body.text);
  const newComment = await Comment.create({text: req.body.text, author: user, post: postId});
  await Post.updateMany({ '_id': postId }, { $push: { comment: newComment._id } });
  res.redirect('/');
}