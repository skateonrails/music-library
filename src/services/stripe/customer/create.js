const stripeCustomers = require('./../common/stripe').customers

module.exports = {
  /**
   * Create a customer using Stripe
   * @param {Object} data data used to create a customer on Stripe
   * @param {Object} [customers=stripe.customers] object representing Stripe.customers class
   * @param {User} data.user User that will become a customer
   * @param {string} data.source Stripe.js source
   * @returns {object} Stripe customer object
   */
  process: async (data, customers = stripeCustomers) => {
    const result = await customers.create(stripeParams(data))

    return result
  },
}

function stripeParams(data) {
  return {
    email: data.user.email,
    source: data.source,
    metadata: {
      name: data.user.name,
      userId: data.user.id,
    },
  }
}
