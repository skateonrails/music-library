/* eslint-disable no-process-env, import/first, global-require */
const _ = require('lodash')

const env = process.env.NODE_ENV || 'development'

if (_.includes(['development', 'test'], env)) {
  require('dotenv').config({ silent: false })
}

const environmentConfigPath = `./environments/${env}`
const environmentConfig = require(environmentConfigPath)
const defaultConfig = require('./default')(env)

const resultConfig = _.merge({}, defaultConfig, environmentConfig)

module.exports = resultConfig
