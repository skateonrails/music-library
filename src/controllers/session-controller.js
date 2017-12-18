const compose = require('koa-compose')
const schema = require('./../validation/schema')
const validationMiddleware = require('./../middleware/validation')
const fetchFirstUserService = require('../services/user/fetch-first')
const generateAccessTokenService = require('../services/auth/generate-access-token')
const errors = require('./../common/errors')

module.exports = {
  create: compose([
    validationMiddleware.validateBody(schema.session.schema),
    async ctx => {
      const user = await fetchFirstUserService.process(ctx.request.validatedBody.session)

      if (!user) {
        throw new errors.UnauthorizedError()
      }
      const authToken = generateAccessTokenService.process(user)

      ctx.status = 201
      ctx.body = { authToken }
    },
  ]),
}
