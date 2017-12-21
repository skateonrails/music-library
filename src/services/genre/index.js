const createService = require('./create')
const updateService = require('./update')
const findService = require('./find')

module.exports = {
  create: createService,
  update: updateService,
  find: findService,
}
