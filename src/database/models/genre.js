const Base = require('./base')

class GenreModel extends Base {
  static get tableName() {
    return 'genres'
  }
}

module.exports = GenreModel
