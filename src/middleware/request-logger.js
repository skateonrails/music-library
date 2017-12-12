const logger = require('../common/logger')

module.exports = {
  async logRequest(ctx, middleware) {
    logger.info({ request: ctx.request }, 'Incoming request:')
    logger.info({ body: ctx.request.body }, 'Incoming body:')

    await middleware()
  },
}
