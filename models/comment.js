const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  image: {
    type: Schema.Types.ObjectId,
    ref: 'Image'
  },
  value: {
    type: String
  }
})

module.exports = mongoose.model('Comment', CommentSchema);