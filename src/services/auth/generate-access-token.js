const jwt = require('jsonwebtoken')
const config = require('./../../config')

module.exports = {
  /**
   * Generate access token from user
   * @param {User} user User instance
   * @param {object} tokenizer An object that responds to sign method
   * @returns {Object}
   */
  process: (user, tokenizer = jwt) => {
    const userId = user.id
    const payload = { userId }
    const token = tokenizer.sign(payload, config.auth.secret, config.auth.createOptions)

    return token
  },
}
