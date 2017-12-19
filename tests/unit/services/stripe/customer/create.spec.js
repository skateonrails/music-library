const chai = require('chai')
const nock = require('nock')

const userFactory = require('./../../../../factories/user-factory')
const createResponse = require('./../../../../support/nock-responses/stripe/customer/create')
const createCustomerService = require('./../../../../../src/services/stripe/customer/create')


const expect = chai.expect

describe('services/stripe/customer/create', () => {

  beforeEach(async () => {
    const user = await userFactory.create({
      email: 'email@email.cz',
    })
    this.user = user

    nock('https://api.stripe.com/v1')
      .post('/customers')
      .reply(200, createResponse)
  })

  it('should create a customer on Stripe api', async () => {
    const attributes = {
      source: 'stripe_js_source',
      user: this.user,
    }

    const stripeCustomer = await createCustomerService.process(attributes)

    expect(stripeCustomer).to.be.a('object')
    expect(stripeCustomer.id).to.be.equal('cus_ByfE4gXPgX8MTN')
  })
})
