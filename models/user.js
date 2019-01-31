/**
 * Created by vivalaakam on 22.01.2019.
 *
 * @flow
 */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const uuid4 = require('uuid/v4')

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuid4 },
  name: {
    type: String,
    required: [true, 'usernameRequired']
  },
  email: { type: String },
  _password: { type: String, default: '' },
  providers: [{
    provider: { type: String },
    uid: { type: String },
    secret: { type: String }
  }]
}, {
  usePushEach: true
})

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = bcrypt.hashSync(password, 8)
  })
  .get(function () {
    return this._password
  })

userSchema.statics = {
  load: function (criteria, cb) {
    return this.findOne(criteria).exec(cb)
  }
}

userSchema.methods = {
  checkPassword: function (password) {
    return bcrypt.compareSync(password, this._password)
  },
  toJSON: function () {
    return {
      uid: this._id,
      name: this.name
    }
  }
}


module.exports = mongoose.model('User', userSchema)
