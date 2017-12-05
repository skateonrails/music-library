const joi = require('joi')
const schema = require('../validation/schema')

module.exports = {
  index(ctx) {
    ctx.status = 200
    ctx.body = {
      genres: ['dubstep', 'trap', 'DnB'],
    }
  },
  create(ctx) {
    const result = joi.validate(ctx.request.body, schema.genre.schema)
    if (result.error !== null) {
      ctx.status = 500
      ctx.body = {
        errors: 'Wrong params'
      }
      return
    }

    ctx.status = 201
    ctx.body = {
      genre: ctx.request.body.genre,
    }
  },
  update(ctx) {
    const result = joi.validate(ctx.request.body, schema.genre.schema)
    if (result.error !== null) {
      ctx.status = 500
      ctx.body = {
        errors: 'Wrong params'
      }
      return
    }
    ctx.status = 200
    ctx.body = {
      genre: ctx.request.body.genre,
    }
  },
}
