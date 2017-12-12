const models = require('./../../database/models')

module.exports = {
  process: async (id, data) => {
    const updatedGenre = await models.genre
      .query()
      .patchAndFetchById(id, data)

    return updatedGenre
  },
}
