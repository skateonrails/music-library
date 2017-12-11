const uuid = require('uuid')
const log = require('../common/logger')
const config = require('../config')
const errors = require('../common/errors')

module.exports = {
  async handleErrors(ctx, middleware) {
    try {
      await middleware()
    } catch (error) {
      if (error instanceof errors.ServerError) {
        ctx.status = error.status || 500
        ctx.body = {
          type: error.type,
          message: error.message,
        }
        return
      }

      error.correlationId = uuid.v1()
      log.error(error, 'Unhandled error')

      ctx.status = 500

      if (config.env === 'production') {
        ctx.body = {
          correlationId: error.correlationId,
          message: 'Unknown error occurred.',
        }
      } else {
        ctx.body = {
          message: error.message,
          stack: error.stack,
        }
      }
    }
  }
}