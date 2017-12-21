const chai = require('chai')
const nock = require('nock')
const sinon = require('sinon')

const databaseCleaner = require('./../../../../support/database-cleaner')
const userFactory = require('./../../../../factories/user-factory')
const createResponse = require('./../../../../support/nock-responses/stripe/customer/create')
const createCustomerService = require('./../../../../../src/services/stripe/customer/create')


const expect = chai.expect

describe('services/stripe/customer/create', () => {

  beforeEach(async () => {
    await databaseCleaner.resetDb()

    const user = await userFactory.create({
      email: 'email@email.cz',
    })
    this.user = user
  })

  it('should create a customer on Stripe api', async () => {
    nock('https://api.stripe.com/v1')
      .post('/customers')
      .reply(200, createResponse)

    const attributes = {
      source: 'stripe_js_source',
      user: this.user,
    }

    const stripeCustomer = await createCustomerService.process(attributes)

    expect(stripeCustomer).to.be.a('object')
    expect(stripeCustomer.id).to.be.equal('cus_ByfE4gXPgX8MTN')
  })

  it('should create a customer sending right parameters', async () => {
    const stubCustomers = {
      create: () => createResponse,
    }
    const customers = sinon.spy(stubCustomers, 'create')
    const attributes = {
      source: 'stripe_js_source',
      user: this.user,
    }

    const stripeCustomer = await createCustomerService.process(attributes, stubCustomers)

    const called = customers.withArgs({
      email: this.user.email,
      source: attributes.source,
      metadata: {
        name: this.user.name,
        userId: this.user.id,
      }
    }).calledOnce
    expect(called).is.equal(true)
    expect(stripeCustomer).to.be.a('object')
    expect(stripeCustomer.id).to.be.equal('cus_ByfE4gXPgX8MTN')
  })
})
