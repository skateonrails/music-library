const _ = require('lodash')
const config = require('./src/config')

const staticDatabaseConfig = {
  migrations: {
    directory: './src/database/migrations',
  },
  seeds: {
    directory: './src/database/seeds',
  },
}
const databaseConfig = _.merge(config.database, staticDatabaseConfig)

module.exports = {
  [config.env]: databaseConfig,
}
