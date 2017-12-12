const models = require('./../../database/models')

module.exports = {
  process: async data => {
    const newGenre = await models.genre
      .query()
      .insert(data)
      .returning('*')

    return newGenre
  },
}
