const request = require('supertest-koa-agent')
const chai = require('chai')
const app = require('../../../src/app')

const expect = chai.expect

describe('genres', () => {

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
})
