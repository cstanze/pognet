const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const posts = 'public/images/posts'
const profile = 'public/images/profile'
const banners = 'public/images/banners'
const boardProfile = 'public/images/board_profile'
const { body, validationResult } = require('express-validator')
const postDir = multer({ dest: posts })
const profDir = multer({ dest: profile })
const bannDir = multer({ dest: banners })
const boarDir = multer({ dest: boardProfile })
const shortid = require('shortid')
const router = express.Router()
const Board = mongoose.model('Board')
const Post = mongoose.model('Post')
const User = mongoose.model('User')

router.get('/boards/all', (req, res) => {
	Board.find({}).then(boards => {
		res.send(boards)
	}).catch(err => {
		res.send(err)
	})
})

router.get('/board/:boardId', (req, res) => {
	Board.findOne({ _id: req.params.boardId }).then(board => {
		res.send(board)
	}).catch(err => {
		res.send(err)
	})
})

router.get('/banner/user/:username', (req, res) => {
	User.findOne({ username: req.params.username }).then(user => {
		res.send({ url: `/${user.banner}` })
	}).catch(err => {
		res.send(err)
	})
})

router.get('/banner/board/:boardname', (req, res) => {
	Board.findOne({ displayName: req.params.boardname }).then(board => {
		res.send({ url: `/${board._banner}` })
	}).catch(err => {
		res.send(err)
	})
})

router.get('/pfp/:username', (req, res) => {
	User.findOne({ username: req.params.username }).then(user => {
		res.send({ url: `/${user.photo}` })
	}).catch(err => {
		res.send(err)
	})
})

router.get('/posts/all', (req, res) => {
	Post.find({}).then(posts => {
		res.send(posts.reverse())
	}).catch(err => {
		res.send(err)
	})
})

router.get('/posts/board/:boardId', (req, res) => {
	Post.find({ _board: req.params.boardId }).then(posts => {
		if(!posts || posts.length == 0) return res.send({ msg: `There aren't any posts from: ${req.params.username}`, code: 10011 })
		res.send(posts.reverse())
	}).catch(err => {
		res.send(err)
	})
})

router.get('/posts/user/:username', (req, res) => {
	User.findOne({ username: req.params.username }).then(user => {
		if(!user) return res.send({ msg: `Couldn't find a user with the name: ${req.params.username}`, code: 10010 })
		Post.find({ _author: user._id }).then(posts => {
			if(!posts || posts.length == 0) return res.send({ msg: `There aren't any posts from: ${req.params.username}`, code: 10011 })
			res.send(posts.reverse())
		})
	}).catch(err => {
		res.send(err)
	})
})

router.get('/post/:postId', (req, res) => {
	Post.findOne({ _id: req.params.postId }).then(post => {
		if(!post) res.send({ msg: `Couldn't find a post with the id: ${req.params.postId}`, code: 10020 })
		res.send(post)
	}).catch(err => {
		res.send(err)
	})
})

router.get('/search/title/:query', (req, res) => {
	Post.aggregate([{ $match: { title: new RegExp(`${req.params.query}`, 'gi') } }]).then(posts => {
		if(!posts) res.send({ msg: `Couldn't find a post with the text query: ${req.params.query}`, code: 10030 })
			res.send(posts.reverse())
	}).catch(err => {
		res.send(err)
	})
})

router.get('/search/body/:query', (req, res) => {
	Post.aggregate([{ $match: { body: new RegExp(`${req.params.query}`, 'gi') } }]).then(posts => {
		if(!posts) res.send({ msg: `Couldn't find a post with the text query: ${req.params.query}`, code: 10030 })
			res.send(posts.reverse())
	}).catch(err => {
		res.send(err)
	})
})

// MARK: Private API entrypoints
router.get('/user/:userId', (req, res) => {
	User.findOne({ _id: req.params.userId }).then(user => {
		res.send(user)
	}).catch(err => {
		res.send(err)
	})
})

module.exports = router
