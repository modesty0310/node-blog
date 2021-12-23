const Comment = require('../database/models/Comment');
const Post = require('../database/models/Post');

exports.createComment = async (req, res) => {
  const user = req.user._id;
  const postId =req.params.id;
  const newComment = await Comment.create({text: req.body.text, author: user, post: postId});
  await Post.updateMany({ '_id': postId }, { $push: { comment: newComment._id } });
  res.redirect(`/posts/${postId}`);
}

exports.deleteComment = async (req, res) => {
  const _id = req.params.id
  const comment = await Comment.findByIdAndDelete({_id});
  res.redirect(`/posts/${comment.post}`);
}