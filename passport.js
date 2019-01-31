/**
 * Created by vivalaakam on 22.01.2019.
 *
 * @flow
 */

const jwt_strategy = require('./strategies/jwt')
const facebook_strategy = require('./strategies/facebook')
const google_strategy = require('./strategies/google')

module.exports = function (passport) {
  passport.use(jwt_strategy)
  passport.use(facebook_strategy)
  passport.use(google_strategy)

  passport.serializeUser(function (user, done) {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user)
  })
}
