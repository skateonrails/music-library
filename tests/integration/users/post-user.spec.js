const chai = require('chai')
const app = require('../../../src/app')
const databaseCleaner = require('./../../support/database-cleaner')
const authorizedRequest = require('./../../support/authorized-request')

const expect = chai.expect

describe('POST /user', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()
  })

  it('should create a user', async () => {
    const res = await authorizedRequest({
      app,
      method: 'post',
      routePath: '/user',
      expectedStatus: 201,
      data: {
        user: {
          name: 'Leumas Odrap',
          email: 'email@email.cz',
          password: 'passw0rD!1!1!1',
        },
      },
    })

    expect(res.body).to.have.keys(['user'])
    expect(res.body.user).to.be.an('object')
    expect(res.body.user).not.to.have.keys(['password'])

    expect(res.body.user.name).to.be.equal('Leumas Odrap')
    expect(res.body.user.email).to.be.equal('email@email.cz')
  })

  // it('should return BadRequest error', async () => {
  //   const res = await authorizedRequest({
  //     app,
  //     method: 'post',
  //     routePath: '/user',
  //     expectedStatus: 400,
  //     data: {
  //       user: {
  //         _name: 'Crazy user',
  //       },
  //     },
  //   })

  //   expect(res.body).to.have.keys(['message', 'type'])
  //   expect(res.body.message).to.be.equal('Validation did not passed.')
  //   expect(res.body.type).to.be.equal('E_VALIDATION')
  // })
})
