const { isNull, isUndefined } = require('util')
const errors = require('../common/errors')

module.exports = {
  ensureResourceFound(resourceModel) {
    return async (ctx, middleware) => {
      const resource = await resourceModel.query().findById(ctx.params.id)

      if (isUndefined(resource) || isNull(resource)) {
        throw new errors.NotFoundError()
      }

      ctx.request.foundResource = resource

      await middleware()
    }
  }
}
