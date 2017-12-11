const { isNull, isUndefined } = require('util')
const _ = require('lodash')
const joi = require('joi')
const schema = require('../validation/schema')
const models = require('../database/models')
const errors = require('../common/errors')

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
  },
  async create(ctx) {
    const result = joi.validate(ctx.request.body, schema.genre.schema)
    if (result.error !== null) {
      throw new errors.ValidationError()
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
  async update(ctx) {
    const genre = await models.genre
      .query()
      .findById(ctx.params.id)

    if (isUndefined(genre) || isNull(genre)) {
      throw new errors.NotFoundError()
    }

    const result = joi.validate(ctx.request.body, schema.genre.schema)
    if (result.error !== null) {
      throw new errors.ValidationError()
    }

    // updating value
    const updatedGenre = await models.genre
      .query()
      .patchAndFetchById(ctx.params.id, ctx.request.body.genre)

    ctx.status = 200
    ctx.body = {
      genre: {
        name: updatedGenre.name,
      },
    }
  },
}
