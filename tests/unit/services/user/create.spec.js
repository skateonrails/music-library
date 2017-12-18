const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const databaseCleaner = require('./../../../support/database-cleaner')
const hashString = require('./../../../../src/common/hash-string')
const createService = require('./../../../../src/services/user/create')

chai.use(chaiAsPromised)

const expect = chai.expect

describe('services/user/create', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should create a user with hashed password', async () => {
    const attributes = {
      name: 'Name',
      email: 'email@email.cz',
      password: 'passW0Rd!11!',
    }

    const newUser = await createService.process(attributes)

    expect(newUser.name).to.be.equal('Name')
    expect(newUser.email).to.be.equal('email@email.cz')
    expect(hashString.compare('passW0Rd!11!', newUser.password)).to.eventually.equal(true)
  })
})
