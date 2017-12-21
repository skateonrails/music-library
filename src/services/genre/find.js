const genreModel = require('./../../database/models').genre

module.exports = {
  process: async () => {
    const genres = await genreModel.query()
    return genres
  },
}
