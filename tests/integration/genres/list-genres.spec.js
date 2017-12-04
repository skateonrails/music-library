const request = require('supertest-koa-agent')
const chai = require('chai')
const app = require('../../../src/app')

const expect = chai.expect

describe('/', () => {

  it('should list music genres', async () => {
    const res = await request(app)
      .get('/')
      .expect(200)

    expect(res.body).to.exist()
    expect(res.body).to.have.keys(['genres'])
    expect(res.body.genres).to.have.values(['dubstep', 'trap', 'DnB'])
  })
})
