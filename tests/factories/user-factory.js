/* eslint-disable camelcase */
const faker = require('faker')
const createUserService = require('../../src/services/user/create')

module.exports = {
  create: (params = {
    name: null,
    email: null,
    password: null,
  }) => {
    const attributes = {
      name: params.name || faker.name.findName(),
      email: params.email || faker.internet.email(),
      password: params.password || faker.internet.password(),
    }

    return createUserService.process(attributes)
  },
}
