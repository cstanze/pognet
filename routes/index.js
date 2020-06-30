const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const bcrypt = require('bcryptjs')
const fs = require('fs')
const io = require('socket.io')(90, {})
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

// MARK: Private stuff I put on the top for no reason at all...

router.get('/registrations', (req, res) => {
  User.find().then((users) => {
    res.render('registers', { title: 'Registrations', users })
  }).catch((err) => {
    res.send(`Killer Error Dude! Really thrashin my code man\n\n${err}`)
  })
})

// TODO: Fix this stuff and make it less error-prone.

router.get('/signup', (req, res) => {
  res.render('signup', { title: "Sign Up", form_title: "Sign Up" })
})

router.get('/', (req, res) => {
	res.render('home', { title: "Home" })
})

router.post('/signup', [
	body('username').isLength({ min: 1 }).withMessage("Hmm... You don't have a username"),
	body('username').isLength({ max: 32 }).withMessage("Uh oh! Your username too long."),
	body('email').isLength({ min: 1 }).isEmail().withMessage("You'll need to include an email to signup"),
	body('password').isLength({ min: 1 }).withMessage("You're missing a password! How will you sign in?"),
],(req, res) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		let salt = bcrypt.genSaltSync(10)
		const user = new User({
		  	photo: 'images/profile/default.png',
			email: req.body.email,
			bio: 'Hello! I\'m a new user!',
			name: 'No Name',
			username: req.body.username,
			posts: [],
			password: bcrypt.hashSync(req.body.password, salt),
			_postCount: '0',
			_epoch: new Date().toDateString(),
			banner: 'images/banners/default.png',
			nsfw: false,
			_admin: false
		})
		user.save().then((user) => {
			res.render('signup', { title: "Hold please.", redir: true, user_id: user._id })
		}).catch((err) => {
			if(typeof err.errors != 'undefined') {
				if(err.errors.username && err.errors.email) {
					if(err.errors.username.kind == "unique" && err.errors.email.kind == "unique") {
						res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Email and username already exists."}], data: req.body })
					} else {
						res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Something went wrong... Try again later."}], data: req.body })
					}
				} else if(err.errors.username) {
					if(err.errors.username.kind == "unique") {
						res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Username already exists."}], data: req.body })
					} else {
						res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Something went wrong... Try again later."}], data: req.body })
					}
				} else if(err.errors.email) {
					if(err.errors.email.kind == "unique") {
						res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Email already exists."}], data: req.body })
					} else {
						res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Something went wrong... Try again later."}], data: req.body })
					}
				} else {
					if(err.kind == "unique") {
						res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Something went wrong... Try again later."}], data: req.body })
					} else {
						res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Something went wrong... Try again later."}], data: req.body })
					}
				}
			} else if(err.kind == "unique" && err.path == 'username') {
				res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Username already exists."}], data: req.body })
			} else if(err.kind == "unique" && err.path == 'email') {
				res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Email already exists."}], data: req.body })
			} else {
				res.render('signup', { title: "Sign Up", form_title: "Sign Up", errors: [{msg: "Something went wrong... Try again later."}], data: req.body })
			}
		})
	} else {
		res.render('signup', {
			title: "Sign Up",
			form_title: "Sign up",
			errors: errors.array(),
			data: req.body
		})
	}
})

router.get('/login', (req, res) => {
	res.render(`login`, { title: 'Log In', form_title: 'Login' })
})

router.post('/login',[
	body('username').isLength({ min: 1 }).withMessage(`You need to enter a username!`),
	body('password').isLength({ min: 1 }).withMessage(`You`)
],(req, res) => {
	const errors = validationResult(req)
	if(errors.isEmpty()) {
		User.findOne({ username: req.body.username }).then(user => {
			if(!user) return res.render('login', { title: 'Log In', form_title: 'Login', errors: [{ msg: `The user: "${req.body.username}" doesn't exist` }], data: req.body})
			if(bcrypt.compareSync(req.body.password, user.password)) {
				res.render('login', { title: "Hold please.", redir: true, user_id: user._id })
			} else {
				res.render('login', {
					title: 'Log In',
					form_title: 'Login',
					errors: [{
						msg: 'Incorrect password...'
					}],
					data: req.body
				})
			}
		})
	} else {
		res.render('login', {
			title: 'Log In',
			form_title: 'Login',
			errors: errors.array(),
			data: req.body
		})
	}
})

router.get(`/new/board`, (req, res) => {
	res.render(`new-board`, { title: 'New Board', form_title: 'New Board' })
})

router.post('/new/board', [
	body('displayName').isLength({ min: 1 }).withMessage(`Hmm... You don't have a display name for your board.`),
	body('displayName').isLength({ max: 32 }).withMessage(`The display name is too long!`),
	body(`userId`).isLength({ min: 1 }).withMessage(`You need to login before creating a board.`)
],(req, res) => {
	const errors = validationResult(req)
	if(errors.isEmpty()) {
		const board = new Board({
			displayName: req.body.displayName,
			desc: "",
			_posts: [],
			_creator: req.body.userId,
			_postCount: '0',
			_latestPost: '',
			_mods: [],
			nsfw: typeof req.body.nsfw != 'undefined' ? true : false,
			_archiveCount: '0',
			_epoch: new Date().toDateString(),
			_banner: 'images/banners/default.png',
			_profile: 'images/board_profile/default.png'
		})
		board.save().then(board => {
			res.redirect('/')
		}).catch(err => {
			if(typeof err.errors != 'undefined') {
				if(err.errors.displayName.kind == 'unique') {
					res.render('new-board', {
						title: 'New Board',
						form_title: 'New Board',
						errors: [{ msg: 'It seems that a board with that name already exists.' }],
						data: req.body
					})
				} else {
					res.render('new-board', {
						title: 'New Board',
						form_title: 'New Board',
						errors: [{ msg: 'Something happened! Try again later.' }],
						data: req.body
					})
				}
			} else {
				res.render('new-board', {
					title: 'New Board',
					form_title: 'New Board',
					errors: [{ msg: 'Something happened! Try again later.' }],
					data: req.body
				})
			}
		})
	} else {
		res.render(`new-board`, {
			title: 'New Board',
			form_title: 'New Board',
			errors: errors.array(),
			data: req.body
		})
	}
})

router.get('/new/post', (req, res) => {
	res.render('new-post', { title: 'New Post', form_title: 'New Post'})
})

router.post('/new/post', postDir.single('image'), [
	body('title').isLength({ min: 1 }).withMessage('Wait! You need a title for your post!'),
	body('body').isLength({ min: 1 }).withMessage(`I can't let you post without a post body.`),
	body('board').isLength({ min: 1 }).withMessage(`You must post to a board.`),
	body('userId').isLength({ min: 1 }).withMessage(`You must be logged in to post.`),
], (req, res) => {
	const errors = validationResult(req)
	if(errors.isEmpty()) {
    let hasImage = false
    let hasVideo = false
    if(typeof req.file != 'undefined') {
      if(/image\//gi.test(req.file.mimetype)) hasImage = true
      if(/video\//gi.test(req.file.mimetype)) hasVideo = true
    }
		let post = new Post({
			  title: req.body.title,
			  body: req.body.body,
			  _epoch: new Date().toDateString(),
			  tags: [],
        hasImage,
        image: hasImage ? (typeof req.file != 'undefined' ? `images/posts/${req.file.filename}` : ``) : ``,
        hasVideo,
        video: hasVideo ? (typeof req.file != 'undefined' ? `images/posts/${req.file.filename}` : ``) : ``,
        videoMime: hasVideo ? (typeof req.file != 'undefined' ? req.file.mimetype : ``) : ``,
			  _author: req.body.userId,
			  _board: req.body.board,
			  nsfw: typeof req.body.nsfw != 'undefined' ? true : false,
			  approved: true,
			  modPost: false,
			  sticky: false,
        votes: "1"
		})

		post.save().then(post => {
			Board.findOneAndUpdate({ _id: post._board }, { $push: { posts: post._id }, $set: { _latestPost: post._id } }).then(board => {
				if(board != null) board._postCount = String(Number(board._postCount)+1)
				board.save().then(board => {
					User.findOneAndUpdate({ _id: req.body.userId }, { $push: { posts: post._id } }).then(user => {
						if(user != null) user._postCount = String(Number(user._postCount)+1)
						user.save().then(user => {
							res.redirect('/')
							io.emit('posted', post)
						})
					})
				})
			})
		}).catch(err => {
			console.log(err)
			res.render('new-post', {
				title: 'New Post',
				form_title: 'New Post',
				errors: [{ msg: 'Something happened! Try again later.' }],
				data: req.body
			})
		})
	} else {
		res.render(`new-post`, {
			title: `New Post`,
			form_title: 'New Post',
			errors: errors.array(),
			data: req.body
		})
	}
})

router.get('/board/:boardName', (req, res) => {
	Board.findOne({ displayName: req.params.boardName }).then(board => {
		if(!board) return res.render('404-board', { title: 'Board Not Found' })
		res.render('board', { title: board.displayName, board: { displayName: board.displayName, _id: board._id, _profile: board._profile, desc: board.desc } })
	}).catch(err => {
		console.log(err)
		res.render('500', { title: '500 Internal Server Error' })
	})
})

router.get('/profile/:username', (req, res) => {
	User.findOne({ username: req.params.username }).then(user => {
		if(!user) res.redirect('/')
		res.render('profile', { title: `${user.username}'s profile`, user })
	}).catch(err => {
		console.log(err)
		res.render('profile', { title: `No Profile Found`, user: {} })
	})
})

router.get('/settings/me', (req, res) => {
	res.render('settings', { title: 'Settings' })
})

router.get('/post/:postId', (req, res) => {
  Post.findOne({ _id: req.params.postId }).then(post => {
    if(!post) return res.render('404', { title: '404 - Post Not Found' })
    console.log(post)
    Board.findOne({ _id: post._board }).then(board => {
      if(!board) return res.render('404', { title: '404 - Post Not Found' })
      res.render('post', { title: `${post.title} - ${board.displayName}`, post })
    }).catch(err => {
      console.log(err)
      res.render('500', { title: '500' })
    })
  }).catch(err => {
    console.log(err)
    res.render('500', { title: '500' })
  })
})

router.get('/board/:boardId/settings', (req, res) => {
  res.render('board-settings', { title: 'Board Settings' })
})

router.post('/board/:boardId/subscribe/:userId',(req, res) => {
  Board.findOne({ _id: req.params.boardId }).then(board => {
    User.findOneAndUpdate({ _id: req.params.userId }, { $push: { subscriptions: `${board._id}` } }).then(user => {
      res.send({ msg: `Subscribed successfully!`, code: 20040 })
    }).catch(err => {
      console.log(err)
      res.send({ msg: `Couldn't Find/Update a user with the id: ${req.params.userId}.`, code: 10041 })
    })
  }).catch(err => {
    console.log(err)
    res.send({ msg: `Couldn't Subscribe to board with id: ${req.params.boardId}.`, code: 10040 })
  })
})

// MARK: Private, user-protected routes

router.get('/upvote/:postId/', (req, res) => {
  Post.findOne({ _id: req.params.postId }).then(post => {
    post.votes = String(Number(post.votes) + 1)
    post.save().then(pst => {
      if(!pst) res.send({ msg: `Couldn't find the post to upvote.`, code: 10090 })
      res.send(pst)
    })
  }).catch(err => {
    console.log(err)
    res.send(err)
  })
})

router.get('/downvote/:postId/', (req, res) => {
  Post.findOne({ _id: req.params.postId }).then(post => {
    post.votes = String(Number(post.votes) - 1)
    post.save().then(pst => {
      if(!pst) res.send({ msg: `Couldn't find the post to downvote.`, code: 10091 })
      res.send(pst)
    })
  }).catch(err => {
    console.log(err)
    res.send(err)
  })
})

router.patch('/settings/board/icon/:boardId', boarDir.single('icon'), (req, res) => {
  // ! Not Too Safe But It Works
  Board.findOneAndUpdate({ _id: req.params.boardId}, { $set: { _profile: `images/board_profile/${req.file.filename}`} }, { new: true }).then(board => {
    // ! This is very dangerous. This allows for MITM snatching of... things....
    res.send(board)
  }).catch(err => {
    console.log(err)
    // FIXME Send more than just the status
    // - Might want to open up to the public but I'm not sure yet.
    res.sendStatus(500)
  })
})

router.patch('/settings/board/reset/icon/:boardId', (req, res) => {
  // ! Not Too Safe But It Works
  Board.findOneAndUpdate({ _id: req.params.boardId }, { $set: { _profile: `images/board_profile/default.png`} }, { new: true }).then(board => {
    // ! This is very dangerous. This allows for MITM snatching of... things....
    res.send(board)
  }).catch(err => {
    console.log(err)
    // FIXME Send more than just the status
    // - Might want to open up to the public but I'm not sure yet.
    res.sendStatus(500)
  })
})

router.post('/settings/board/push/mods', (req, res) => {
  console.log(req.body)
  Board.findOneAndUpdate({ _id: req.body.boardId }, { $push: { _mods: req.body.userId } }, { new: true }).then(board => {
    res.send(board)
  }).catch(err => {
    console.log(err)
    res.sendStatus(500)
  })
})

router.patch('/settings/photo/:userId', profDir.single('photo'), (req, res) => {
	// ! Not Too Safe But It Works
	User.findOneAndUpdate({ _id: req.params.userId }, { $set: { photo: `images/profile/${req.file.filename}` } }, { new: true }).then(user => {
		// ! This is very dangerous. This allows for MITM password snatching...
		res.send(user)
	}).catch(err => {
		console.log(err)
		// FIXME Send more than just the status.
		// - Might want to open up to the public but I'm not sure yet.
		res.sendStatus(500)
	})
})

router.patch('/settings/username/:userId', (req, res) =>{
	// ! Not Too Safe But It Works
	User.findOneAndUpdate({ _id: req.params.userId }, { $set: { username: req.body.username } }, { new: true }).then(user => {
		// ! This is very dangerous. This allows for MITM password snatching...
		res.send(user)
	}).catch(err => {
		console.log(err)
		// FIXME Send more than just the status.
		// - Might want to open up to the public but I'm not sure yet.
		res.sendStatus(500)
	})
})

router.patch('/settings/bio/:userId', (req, res) =>{
	// ! Not Too Safe But It Works
	User.findOneAndUpdate({ _id: req.params.userId }, { $set: { bio: req.body.bio } }, { new: true }).then(user => {
		// ! This is very dangerous. This allows for MITM password snatching...
		res.send(user)
	}).catch(err => {
		console.log(err)
		// FIXME Send more than just the status.
		// - Might want to open up to the public but I'm not sure yet.
		res.sendStatus(500)
	})
})

// TODO: Finish Access Blocking...

module.exports = router
