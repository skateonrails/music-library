const errors = require('./../common/errors')
const verifyAccessToken = require('./../services/auth/verify-access-token')
const fetchFirstUserService = require('./../services/user/fetch-first')

module.exports = {
  async authorized(ctx, middleware) {
    const authorization = ctx.headers.authorization
    if (!authorization) {
      throw new errors.UnauthorizedError()
    }

    let payload
    try {
      payload = verifyAccessToken.process(authorization)
    } catch (error) {
      throw new errors.UnauthorizedError()
    }

    const user = await fetchFirstUserService.process({ id: payload.userId })
    if (!user) {
      throw new errors.UnauthorizedError()
    }

    ctx.request.currentUser = user

    await middleware()
  }
}
