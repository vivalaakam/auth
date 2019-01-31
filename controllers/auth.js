/**
 * Created by vivalaakam on 22.01.2019.
 *
 * @flow
 */
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const asyncMiddleware = require('../utils/asyncMiddleware')
const config = require('../config')

const User = mongoose.model('User')
const Session = mongoose.model('Session')


exports.login = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body
  let user = await User.load({ email })

  if (!user) {
    user = new User({
      email,
      password,
      name: email
    })

    await user.save()
  }

  if (!user.checkPassword(req.body.password)) {
    return res.render('auth', { message: 'Неверный логин или пароль' })
  }

  const session = new Session({
    uid: user._id
  })

  await session.save()

  const token = jwt.sign({ uid: user.id, sid: session.id }, config.secret_jwt, {})
  return res.status(200).json({
    user: user.toJSON(),
    token
  })
})

exports.jwt = asyncMiddleware(async (req, res) => {
  const user = req.user
  const session = new Session({
    uid: user._id
  })

  await session.save()

  const token = jwt.sign({ uid: user.id, sid: session.id }, config.secret_jwt, {})
  return res.status(200).json({
    user: user.toJSON(),
    token
  })
})

exports.protected = (req, res) => {
  return res.status(200).send('YAY! this is a protected Route')
}
