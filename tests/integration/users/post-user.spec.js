const chai = require('chai')
const request = require('supertest-koa-agent')
const app = require('./../../../src/app')
const databaseCleaner = require('./../../support/database-cleaner')

const expect = chai.expect

const queue = require('kue').createQueue()

describe('POST /user', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should create a user', async () => {
    queue.testMode.enter()

    const res = await request(app)
      .post('/user')
      .send({
        user: {
          name: 'Leumas Odrap',
          email: 'email@email.cz',
          password: 'passw0rD!1!1!1',
        },
      })
      .expect(201)

    expect(res.body).to.have.keys(['user'])
    expect(res.body.user).to.be.an('object')
    expect(res.body.user).not.to.have.keys(['password'])

    expect(res.body.user.name).to.be.equal('Leumas Odrap')
    expect(res.body.user.email).to.be.equal('email@email.cz')
  })

  it('should return BadRequest error', async () => {
    const res = await request(app)
      .post('/user')
      .send({
        user: {
          name: 'Leumas Odrap',
        },
      })
      .expect(400)

    expect(res.body).to.have.keys(['message', 'type'])
    expect(res.body.message).to.be.equal('Validation did not passed.')
    expect(res.body.type).to.be.equal('E_VALIDATION')
  })
})
