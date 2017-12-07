/* eslint-disable camelcase */
const Genre = require('./../../src/database/models/genre')
const faker = require('faker')

module.exports = Genre
  .query()
  .insert({
    name: faker.name.findName(),
  })
  .returning('*')

