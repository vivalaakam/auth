const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const join = require('path').join
const passport = require('passport')
const config = require('./config')

mongoose.Promise = require('bluebird')
const models = join(__dirname, './models')
const port = process.env.PORT || 4000
const app = express()

fs.readdirSync(models)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(models, file)))

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('cookie-parser')())
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
app.use(express.static('public'));
app.set('view engine', 'pug')

require('./passport')(passport)
require('./routes')(app, passport)

connect()
  .on('error', console.log)
  .on('disconnected', connect)
  .once('open', listen)

function listen() {
  if (app.get('env') === 'test') return
  app.listen(port)
  console.log('Express app started on port ' + port)
}

function connect() {
  const options = { server: { socketOptions: { keepAlive: 1 } } }
  return mongoose.connect(config.mongodb_uri, options).connection
}
