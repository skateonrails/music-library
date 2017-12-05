const bunyan = require('bunyan')

const logger = bunyan.createLogger({
  name: 'music-library',
})

module.exports = logger
