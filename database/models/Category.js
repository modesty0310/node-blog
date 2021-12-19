const mongoose = require('mongoose');

const categorySchma = mongoose.Schema({
  category:{
    type: String,
  },
})

module.exports = mongoose.model('Category', categorySchma);