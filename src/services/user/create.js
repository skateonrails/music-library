const User = require('./../../database/models/user')
const hashString = require('./../../common/hash-string')
const kue = require('kue')
const queue = kue.createQueue()

module.exports = {
  process: async attributes => {
    await hashPassword(attributes)

    const newUser = await User
      .query()
      .insert(attributes)
      .returning('*')

    return newUser
  },
}

async function hashPassword(attributes) {
  attributes.password = await hashString.generate(attributes.password)
}

function sendEmail(){
  queue.create('email', {
    userId: newUser.id,
  }).save()
}
