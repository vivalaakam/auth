/**
 * Created by vivalaakam on 22.01.2019.
 *
 * @flow
 */

module.exports = {
  auth_server: process.env.AUTH_SEREVR || 'http://localhost:4000',
  mongodb_uri: process.env.MONGODB_URI,
  secret_jwt: process.env.SECRET_JSW || 'SECRET_KEY',
  facebook_id: process.env.FACEBOOK_CLIENT_ID,
  facebook_secret: process.env.FACEBOOK_CLIENT_SECRET
}
