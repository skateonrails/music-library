const stripe = require('./../common/stripe')

module.exports = {
  /**
   * Create a customer using Stripe
   * @param {Object} data data used to create a customer on Stripe
   * @param {User} data.user User that will become a customer
   * @param {string} data.source Stripe.js source
   * @returns {object} Stripe customer object
   */
  process: async data => {
    const result = await stripe.customers.create(stripeParams(data))

    return result
  },
}

function stripeParams(data) {
  return {
    email: data.user.email,
    source: data.user.source,
  }
}
