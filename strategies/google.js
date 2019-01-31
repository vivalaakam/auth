/**
 * Created by vivalaakam on 31.01.2019.
 *
 * @flow
 */
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const config = require('../config')

const User = mongoose.model('User')

const opts = {
  clientID: config.google_id,
  clientSecret: config.google_secret,
  callbackURL: config.auth_server + '/auth/facebook/callback',
  passReqToCallback: true
}


module.exports = new GoogleStrategy(opts, async (req, accessToken, refreshToken, profile, cb) => {
  let user = await User.load({ 'providers': { $elemMatch: { provider: 'google', uid: profile.id } } })

  if (user) {
    return cb(null, user)
  }

  if (profile.emails.length) {
    user = await User.load({ email: profile.emails[0].value })

    if (user) {
      user.providers.push({
        provider: 'google',
        uid: profile.id,
        secret: accessToken
      })

      await user.save()
      return cb(null, user)
    }
  }

  user = new User({
    name: profile.displayName,
    email: profile.emails && profile.emails.length ? profile.emails[0].value : null,
    providers: [
      {
        provider: 'google',
        uid: profile.id,
        secret: accessToken
      }
    ]
  })

  await user.save()
  return cb(null, user)
})
