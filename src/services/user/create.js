const User = require('./../../database/models/user')
const hashString = require('./../../common/hash-string')

module.exports = {
  /**
   * Create a user
   * @param {Object} attributes User attributes
   * @param {string} attributes.name User name
   * @param {string} attributes.email User email
   * @param {string} attributes.password User password
   * @returns {User} New user model
   */
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
