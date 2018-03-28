const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  photo:  String,
  caption: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('post', postSchema)
