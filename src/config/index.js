/* eslint-disable no-process-env, import/first, global-require */
const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  require('dotenv').config({ silent: false })
}

const _ = require('lodash')

const environmentConfigPath = `./environments/${env}`
const environmentConfig = require(environmentConfigPath)
const defaultConfig = require('./default')(env)

const resultConfig = _.merge({}, defaultConfig, environmentConfig)

module.exports = resultConfig
