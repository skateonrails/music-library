const config = require('./../../src/config')
const knex = require('knex')(require('./../../knexfile')[config.env])
const knexCleaner = require('knex-cleaner')

module.exports = {
  resetDb: function resetDb() {
    return knexCleaner.clean(knex)
  },
}
