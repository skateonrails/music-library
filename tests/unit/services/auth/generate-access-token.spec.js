const chai = require('chai')
const sinon = require('sinon')
const databaseCleaner = require('./../../../support/database-cleaner')
const userFactory = require('./../../../factories/user-factory')
const generateAccessTokenService = require('./../../../../src/services/auth/generate-access-token')
const config = require('./../../../../src/config')

const expect = chai.expect

describe('services/authenticate/generate-access-token', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should return a valid token', async () => {
    // stub/spy an object to generate token
    const stubObject = {
      sign: () => 'token',
    }
    const tokenizer = sinon.spy(stubObject, 'sign')

    const user = await userFactory.create()
    const userId = user.id

    const result = generateAccessTokenService.process(user, stubObject)

    //
    const called
      = tokenizer.withArgs({ userId }, config.auth.secret, config.auth.createOptions).calledOnce
    expect(called).is.equal(true)
    expect(result).is.equal('token')
  })
})
