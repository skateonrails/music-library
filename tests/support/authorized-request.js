const request = require('supertest-koa-agent')
const userFactory = require('./../factories/user-factory')
const generateAccessTokenService = require('./../../src/services/auth/generate-access-token')

/**
 * Generate access token from user
 * @param {Object} parameters configuration parameters
 * @param {Koa} parameters.app Koa app instance
 * @param {string} parameters.method an HTTP verb [GET, POST, PUT, PATCH, DELETE]
 * @param {string} parameters.routePath path related to test
 * @param {number} parameters.expectedStatus HTTP status that should be checked
 * @param {Object} parameters.data Data that should be sent to the request
 * @returns {Promise} Returns a promise to check
 */

module.exports = async parameters => {
  const token = await generateToken()
  return setHeader({
    token,
    ...parameters,
  })
}

async function generateToken() {
  const user = await userFactory.create()
  const token = await generateAccessTokenService.process(user)

  return token
}

function setHeader(params = {}) {
  return request(params.app)[params.method](params.routePath)
    .set('Authorization', params.token)
    .send(params.data)
    .expect(params.expectedStatus)
}
