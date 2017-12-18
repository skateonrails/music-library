const jwt = require('jsonwebtoken')
const config = require('./../../config')

module.exports = {
  /**
   * Generate access token from user
   * @param {string} token Token to be verified
   * @param {object} tokenizer An object that responds to verify method
   * @returns {Object} payload from token with user id
   */
  process: (token, tokenizer = jwt) => {
    const payload = tokenizer.verify(token, config.auth.secret, config.auth.createOptions)

    return payload
  },
}
