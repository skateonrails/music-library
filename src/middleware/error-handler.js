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
        knownErrorHandler(ctx, error)
      } else {
        unknownErrorHandler(ctx, error)
      }
    }
  },
}

function knownErrorHandler(ctx, error) {
  ctx.status = error.status || 500
  ctx.body = {
    type: error.type,
    message: error.message,
  }
}

function unknownErrorHandler(ctx, error) {
  error.correlationId = uuid.v1()
  log.error(error, 'Unhandled error')
  ctx.status = 500
  ctx.body = unknownErrorHandlerCtxBody(error)
}

function unknownErrorHandlerCtxBody(error) {
  if (config.env === 'production') {
    return unknownErrorHandlerCtxBodyProd(error)
  }
  return unknownErrorHandlerCtxBodyDev(error)
}

function unknownErrorHandlerCtxBodyProd(error) {
  return {
    correlationId: error.correlationId,
    message: 'Unknown error occurred.',
  }
}

function unknownErrorHandlerCtxBodyDev(error) {
  return {
    message: error.message,
    stack: error.stack,
  }
}
