const request = require('supertest-koa-agent')
const chai = require('chai')
const app = require('../../../src/app')
const databaseCleaner = require('./../../support/database-cleaner')
const authorizedRequest = require('./../../support/authorized-request')

const expect = chai.expect

describe('POST /genre', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should create a music genre', async () => {
    const res = await authorizedRequest({
      app,
      method: 'post',
      routePath: '/genre',
      expectedStatus: 201,
      data: {
        genre: {
          name: 'Crazy Genre',
        },
      },
    })

    expect(res.body).to.have.keys(['genre'])
    expect(res.body.genre).to.be.an('object')
    expect(res.body.genre).to.deep.equal({ name: 'Crazy Genre' })
  })

  it('should return BadRequest error', async () => {
    const res = await authorizedRequest({
      app,
      method: 'post',
      routePath: '/genre',
      expectedStatus: 400,
      data: {
        genre: {
          _name: 'Crazy Genre',
        },
      },
    })

    expect(res.body).to.have.keys(['message', 'type'])
    expect(res.body.message).to.be.equal('Validation did not passed.')
    expect(res.body.type).to.be.equal('E_VALIDATION')
  })
})
