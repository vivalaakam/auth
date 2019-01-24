/**
 * Created by vivalaakam on 22.01.2019.
 *
 * @flow
 */
const auth = require('./controllers/auth')

module.exports = function (app, passport) {
  app.get('/', (req, res) => {
    res.send('hello express server')
  })

  app.get('/terms', (req, res) => {
    res.send('тут будут условия использования')
  })

  app.get('/auth', (req, res) => {
    res.send('auth page')
  })

  app.post('/login', auth.login)
  app.get('/protected', passport.authenticate('jwt', { session: false }), auth.protected)

  app.get('/auth/facebook', passport.authenticate('facebook'))

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/auth' }), auth.jwt)
}
