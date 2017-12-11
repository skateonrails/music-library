const request = require('supertest-koa-agent')
const chai = require('chai')
const app = require('../../../src/app')
const genreFactory = require('./../../factories/genre-factory')
const databaseCleaner = require('./../../support/database-cleaner')

const expect = chai.expect

describe('PATCH /genre/:id', () => {

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

    expect(res.body).to.have.keys(['message', 'type'])
    expect(res.body.message).to.be.equal('Target resource was not found.')
    expect(res.body.type).to.be.equal('E_NOT_FOUND')
  })

  it('should return BadRequest', async () => {
    const genre = await genreFactory
    const res = await request(app)
      .patch(`/genre/${genre.id}`)
      .send({
        genre: {
          _name: 'New Genre',
        },
      })
      .expect(400)

    expect(res.body).to.have.keys(['message', 'type'])
    expect(res.body.message).to.be.equal('Validation did not passed.')
    expect(res.body.type).to.be.equal('E_VALIDATION')
  })
})
