const joi = require('joi')
const errors = require('../common/errors')

module.exports = {
  validateBody(schema) {
    return async (ctx, middleware) => {
      const validationResult = joi.validate(ctx.request.body, schema)
      if (validationResult.error) {
        throw new errors.ValidationError()
      }

      ctx.request.validatedBody = validationResult.value

      // Run next middleware
      await middleware()
    }
  }
}