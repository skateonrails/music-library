const _ = require('lodash')
const joi = require('joi')
const schema = require('../validation/schema')
const models = require('../database/models')

module.exports = {
  async index(ctx) {
    await models.genre
      .query()
      .then(genres => {
        ctx.status = 200
        ctx.body = {
          genres: _.map(genres, genre => {
            return genre.name
          }),
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  async create(ctx) {
    const result = joi.validate(ctx.request.body, schema.genre.schema)
    if (result.error !== null) {
      ctx.status = 500
      ctx.body = {
        errors: 'Wrong params',
      }
      return
    }

    const newGenre = await models.genre
      .query()
      .insert(ctx.request.body.genre)
      .returning('*')

    ctx.status = 201
    ctx.body = {
      genre: {
        name: newGenre.name,
      },
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
