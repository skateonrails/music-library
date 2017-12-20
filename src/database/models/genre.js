const Base = require('./base')

class GenreModel extends Base {
  static get tableName() {
    return 'genres'
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString()
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString()
  }
}

module.exports = GenreModel
