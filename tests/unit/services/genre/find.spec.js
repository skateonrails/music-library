const chai = require('chai')
const databaseCleaner = require('./../../../support/database-cleaner')
const findAllGenreService = require('./../../../../src/services/genre/find')
const genreFactory = require('./../../../factories/genre-factory')

const expect = chai.expect

describe('services/genre/create', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()

    const genre = await genreFactory
    this.genre = genre
  })

  describe('without parameters', () => {
    it('should find all music genre', async () => {
      const genres = await findAllGenreService.process()

      expect(genres).to.be.a('array')
      const genre = genres[0]
      expect(genre.id).to.be.equal(this.genre.id)
      expect(genre.name).to.be.equal(this.genre.name)
    })
  })
})
