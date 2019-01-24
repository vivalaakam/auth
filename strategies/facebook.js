/**
 * Created by vivalaakam on 22.01.2019.
 *
 * @flow
 */
const mongoose = require('mongoose')
const FacebookStrategy = require('passport-facebook').Strategy
const config = require('../config')

const User = mongoose.model('User')

const opts = {
  clientID: config.facebook_id,
  clientSecret: config.facebook_secret,
  callbackURL: config.auth_server + '/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'email'],
  passReqToCallback: true
}

module.exports = new FacebookStrategy(opts, async (req, accessToken, refreshToken, profile, cb) => {
  let user = await User.load({ 'providers': { $elemMatch: { provider: 'facebook', uid: profile.id } } })

  if (user) {
    return cb(null, user)
  }

  if (profile.emails.length) {
    user = await User.load({ email: profile.emails[0].value })

    if(user) {
      user.providers.push({
        provider: 'facebook',
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
        provider: 'facebook',
        uid: profile.id,
        secret: accessToken
      }
    ]
  })

  await user.save()
  return cb(null, user)
})
