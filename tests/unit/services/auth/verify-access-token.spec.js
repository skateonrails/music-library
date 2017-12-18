const chai = require('chai')
const sinon = require('sinon')
const databaseCleaner = require('./../../../support/database-cleaner')
const userFactory = require('./../../../factories/user-factory')
const verifyAccessTokenService = require('./../../../../src/services/auth/verify-access-token')
const config = require('./../../../../src/config')

const expect = chai.expect

describe('services/authenticate/verify-access-token', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should return a valid payload if token is right', async () => {
    // stub/spy an object to generate payload
    const user = await userFactory.create()
    const userId = user.id
    const tokenObject = {
      verify: () => ({ userId }),
    }
    const spy = sinon.spy(tokenObject, 'verify')

    const token = 'token'

    const result = verifyAccessTokenService.process(token, tokenObject)

    //
    const called
      = spy.withArgs(token, config.auth.secret, config.auth.createOptions).calledOnce
    expect(called).is.equal(true)
    expect(result.userId).to.be.equal(userId)
  })
})
