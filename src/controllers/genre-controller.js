const compose = require('koa-compose')
const _ = require('lodash')
const schema = require('../validation/schema')
const models = require('../database/models')
const validationMiddleware = require('../middleware/validation')
const resourceFinderMiddleware = require('../middleware/resource-finder')
const genreServices = require('./../services').genre

module.exports = {
  index: async ctx => {
    const genres = await models.genre
      .query()

    ctx.status = 200
    ctx.body = {
      genres: _.map(genres, genre => genre.name),
    }
  },

  create: compose([
    validationMiddleware.validateBody(schema.genre.schema),

    async ctx => {
      const newGenre = await genreServices.create.process(ctx.request.validatedBody.genre)

      ctx.status = 201
      ctx.body = {
        genre: {
          name: newGenre.name,
        },
      }
    },
  ]),

  update: compose([
    resourceFinderMiddleware.ensureResourceFound(models.genre),
    validationMiddleware.validateBody(schema.genre.schema),

    async ctx => {
      const genre = ctx.request.foundResource
      // updating value
      const updatedGenre = await genreServices.update.process(
        genre.id,
        ctx.request.validatedBody.genre,
      )

      ctx.status = 200
      ctx.body = {
        genre: {
          name: updatedGenre.name,
        },
      }
    },
  ]),
}
