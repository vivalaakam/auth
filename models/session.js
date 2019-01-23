/**
 * Created by vivalaakam on 22.01.2019.
 *
 * @flow
 */
const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
  uid: {
    type: String
  }
})

module.exports = mongoose.model('Session', sessionSchema)
