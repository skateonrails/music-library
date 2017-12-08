const request = require('supertest-koa-agent')
const chai = require('chai')
const app = require('../../../src/app')
const genreFactory = require('./../../factories/genre-factory')
const databaseCleaner = require('./../../support/database-cleaner')

const expect = chai.expect

describe('GET /', () => {
  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should list music genres', async () => {
    const genre = await genreFactory
    const res = await request(app)
      .get('/')
      .expect(200)

    expect(res.body).to.have.keys(['genres'])
    expect(res.body.genres).to.be.an('array')
    expect(res.body.genres.length).to.be.eq(1)
    expect(res.body.genres).to.have.members([genre.name])
  })
})
