const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const databaseCleaner = require('./../../../support/database-cleaner')
const createService = require('./../../../../src/services/user/create')
const fetchFirstService = require('./../../../../src/services/user/fetch-first')

chai.use(chaiAsPromised)

const expect = chai.expect

describe('services/user/fetch-first', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()

    const attributes = {
      name: 'Name',
      email: 'email@email.cz',
      password: 'passW0Rd!11!',
    }

    this.newUser = await createService.process(attributes)
  })

  it('should find a user matching email and password', async () => {
    const attributes = {
      email: 'email@email.cz',
      password: 'passW0Rd!11!',
    }

    const user = await fetchFirstService.process(attributes)
    expect(user.id).to.be.equal(this.newUser.id)
    expect(user.name).to.be.equal(this.newUser.name)
    expect(user.email).to.be.equal(this.newUser.email)
    expect(user.password).to.be.equal(this.newUser.password)
  })

  it('should return null', async () => {
    const attributes = {
      email: 'email2@email.cz',
    }

    const user = await fetchFirstService.process(attributes)

    expect(user).to.be.a('null')
  })
})
