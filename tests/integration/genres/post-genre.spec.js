const request = require('supertest-koa-agent')
const chai = require('chai')
const app = require('../../../src/app')
const databaseCleaner = require('./../../support/database-cleaner')

const expect = chai.expect

describe('/genre', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should create a music genre', async () => {
    const res = await request(app)
      .post('/genre')
      .send({
        genre: {
          name: 'Crazy Genre',
        }
      })
      .expect(201)

    expect(res.body).to.have.keys(['genre'])
    expect(res.body.genre).to.be.an('object')
    expect(res.body.genre).to.deep.equal({ name: 'Crazy Genre' })
  })
  
  it('should return error', async () => {
    const res = await request(app)
      .post('/genre')
      .send({
        genre: {
          _name: 'Crazy Genre',
        }
      })
      .expect(500)

    expect(res.body).to.have.keys(['errors'])
    expect(res.body.errors).to.be.equal('Wrong params')
  })
})
