const request = require('supertest-koa-agent')
const chai = require('chai')
const app = require('../../../src/app')
const genreFactory = require('./../../factories/genre-factory')
const databaseCleaner = require('./../../support/database-cleaner')

const expect = chai.expect

describe('/genre/:id', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should update a music genre', async () => {
    const genre = await genreFactory
    const res = await request(app)
      .patch(`/genre/${genre.id}`)
      .send({
        genre: {
          name: 'New Genre',
        }
      })
      .expect(200)

    expect(res.body).to.have.keys(['genre'])
    expect(res.body.genre).to.be.an('object')
    expect(res.body.genre).to.deep.equal({ name: 'New Genre' })
  })

  it('should return `Not Found` error', async () => {
    const res = await request(app)
      .patch('/genre/1')
      .send({
        genre: {
          _name: 'New Genre',
        },
      })
      .expect(404)

    expect(res.body).to.have.keys(['errors'])
    expect(res.body.errors).to.be.equal('Genre not found')
  })
  
  it('should return error', async () => {
    const genre = await genreFactory
    const res = await request(app)
      .patch(`/genre/${genre.id}`)
      .send({
        genre: {
          _name: 'New Genre',
        },
      })
      .expect(500)

    expect(res.body).to.have.keys(['errors'])
    expect(res.body.errors).to.be.equal('Wrong params')
  })
})
