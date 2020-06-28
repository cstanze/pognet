const mongoose = require('mongoose')
const shortid = require('shortid')
const uniqueVal = require('mongoose-unique-validator')

const boardSchema = new mongoose.Schema({
  // ShortID Generation For Board Identification
  _id: {
    type: String,
    default: shortid.generate
  },
  // Display Name Because Of Course We Need Human Friendly Names And Identifiers
  displayName: {
    type: String,
    unique: true
  },
  // Just A Little Board Description For Users
  desc: {
    type: String
  },
  // Store the Posts In An Array
  posts: {
    type: [String]
  },
  // Save creator as the ID
  _creator: {
    type: String
  },
  // Post Count Just For Fun
  _postCount: {
    type: String
  },
  // Latest Post
  _latestPost: {
    type: String
  },
  // Moderator List
  _mods: {
    type: [String]
  },
  // NSFW Board Tagging
  nsfw: {
    type: Boolean
  },
  // Archived Post Count
  _archiveCount: {
    type: String
  },
  // Creation Date
  _epoch: {
    type: String
    // new Date().toDateString()
  },
  // Board Banner
  _banner: {
    type: String
  },
  // Board Profile Picture
  _profile: {
    type: String
  }
})

boardSchema.boardWithName = (displayName, callback) => {
  Board.findOne({ displayName }).exec((err, board) => {
    if(err)
      console.log(err)
    else
      return board
  })
}

boardSchema.plugin(uniqueVal)
let Board = mongoose.model('Board', boardSchema)

module.exports = Board
