const User = require('./../../database/models/user')
const hashString = require('./../../common/hash-string')

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
