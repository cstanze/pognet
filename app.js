const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const central = require('./routes/index')
const api = require('./routes/api')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', central)
app.use('/api', api)
app.use(express.static('public'))

/* 404 & 500 HTTP Error Handling */

app.use((req, res, next) => {
	return res.status(404).render('404', { title: '404' })
})

app.use((err, req, res, next) => {
	console.log(err)
	return res.status(500).render('500', { title: '500' })
})

module.exports = app
