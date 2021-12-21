const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchma = mongoose.Schema({
  name:{
    type: String,
  },
  post:[{
    type: Schema.Types.ObjectId, ref: 'Post',
  }]
});

module.exports = mongoose.model('Category', categorySchma);