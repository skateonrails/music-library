const bcrypt = require('bcrypt')
const crypto = require('crypto')
const config = require('./../config')

module.exports = {
  generate: async string => {
    const hashString = await bcrypt.hash(pepperify(string), config.auth.saltRounds)
    return hashString
  },
  compare: async (plainText, cipherText) => {
    const result = await bcrypt.compare(pepperify(plainText), cipherText)
    return result
  },
}

function pepperify(string) {
  return crypto
    .createHmac('sha1', config.auth.secret)
    .update(string)
    .digest('hex')
}
