const request = require('supertest-koa-agent')
const chai = require('chai')
const app = require('../../../src/app')
const databaseCleaner = require('./../../support/database-cleaner')
const userFactory = require('./../../factories/user-factory')

const expect = chai.expect

describe('POST /sessions', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  describe('sending wrong parameters', () => {
    it('should return BadRequest error', async () => {
      const res = await request(app)
        .post('/sessions')
        .send({
          session: {},
        })
        .expect(400)

      expect(res.body).to.have.keys(['message', 'type'])
      expect(res.body.message).to.be.equal('Validation did not passed.')
      expect(res.body.type).to.be.equal('E_VALIDATION')
    })
  })

  describe('sending right parameters', () => {
    const email = 'email4test@gmail.com'
    const password = 'passw0rD!1!!'

    beforeEach(async () => {
      await userFactory.create({
        email,
        password,
      })
    })

    it('should return jwt token', async () => {
      const res = await request(app)
        .post('/sessions')
        .send({
          session: {
            email,
            password,
          },
        })
        .expect(201)

      expect(res.body).to.have.keys(['authToken'])
      expect(res.body.authToken).to.be.a('string')
    })

    it('should return Unauthorized error if user not found', async () => {
      const res = await request(app)
        .post('/sessions')
        .send({
          session: {
            email,
            password: `wrong_${password}`,
          },
        })
        .expect(401)

      expect(res.body).to.have.keys(['message', 'type'])
      expect(res.body.message).to.be.equal('Not authorized.')
      expect(res.body.type).to.be.equal('E_UNAUTHORIZED')
    })
  })
})
