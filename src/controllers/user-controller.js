const _ = require('lodash')
const compose = require('koa-compose')
const createService = require('./../services/user/create')
const validationMiddleware = require('../middleware/validation')
const schema = require('./../validation/schema')
const kue = require('kue')

const queue = kue.createQueue()

module.exports = {
  create: compose([
    validationMiddleware.validateBody(schema.user.schema),
    async ctx => {
      const newUser = await createService.process(ctx.request.validatedBody.user)
      sendEmail(newUser.id)

      ctx.status = 201
      ctx.body = {
        user: _.omit(newUser.toJSON(), 'password')
      }
    },
  ]),
}

function sendEmail(userId) {
  queue.create('user_email', {
    userId,
  }).save()
}
