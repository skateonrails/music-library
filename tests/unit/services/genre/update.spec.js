const chai = require('chai')
const databaseCleaner = require('./../../../support/database-cleaner')
const updateService = require('./../../../../src/services/genre/update')
const genreFactory = require('./../../../factories/genre-factory')

const expect = chai.expect

describe('services/genre/update', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should update a music genre', async () => {
    const genre = await genreFactory
    const data = {
      name: 'Crazy Genre',
    }

    const updatedGenre = await updateService.process(genre.id, data)

    expect(updatedGenre.id).to.be.equal(genre.id)
    expect(updatedGenre.name).to.be.equal('Crazy Genre')
  })
})
