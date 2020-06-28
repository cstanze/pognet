const mongoose = require('mongoose')
const shortid = require('shortid')

const postSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: {
    type: String
  },
  body: {
    type: String
  },
  hasImage: {
    type: Boolean
  },
  image: {
    type: String
  },
  hasVideo: {
    type: Boolean
  },
  video: {
    type: String
  },
  videoMime: {
    type: String
  },
  _epoch: {
    type: String
  },
  tags: {
    type: [String]
  },
  _author: {
    type: String
  },
  _board: {
    type: String
  },
  nsfw: {
    type: Boolean
  },
  approved: {
    type: Boolean
  },
  modPost: {
    type: Boolean
  },
  sticky: {
    type: Boolean
  }
})

let Post = mongoose.model('Post', postSchema)

module.exports = Post
