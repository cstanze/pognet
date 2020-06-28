const mongoose = require('mongoose')
const shortid = require('shortid')
const uniqueVal = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  photo: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  bio: {
    type: String
  },
  name: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  posts: {
    type: [String]
  },
  password: {
    type: String
  },
  _postCount: {
    type: String
  },
  _epoch: {
    type: String
  },
  banner: {
    type: String
  },
  nsfw: {
    type: Boolean
  },
  _admin: {
    type: Boolean
  },
  subscriptions: {
    type: [String]
  }
})

userSchema.create = (user, callback) => {
  user.save(callback)
}

userSchema.addPost = (_id, post, callback) => {
  User.findOne({ _id }).then(user => {
    post._author = _id
    user.posts.push(post._id)
    post.save().then((err, author) => {
      if (err) console.log(err)
      author.save(callback)
    })
  })
}


userSchema.plugin(uniqueVal)
let User = mongoose.model('User', userSchema)

module.exports = User
