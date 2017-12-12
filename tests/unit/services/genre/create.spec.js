const chai = require('chai')
const databaseCleaner = require('./../../../support/database-cleaner')
const createService = require('./../../../../src/services/genre/create')

const expect = chai.expect

describe('services/genre/create', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should create a music genre', async () => {
    const data = {
      name: 'Crazy Genre',
    }

    const newGenre = await createService.process(data)

    expect(newGenre.name).to.be.equal('Crazy Genre')
  })
})
