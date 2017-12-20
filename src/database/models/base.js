const has = require('lodash/has')
const db = require('./../../database')

class Base extends db.Model {
  $beforeInsert() {
    if (has(this, 'created_at')) {
      this.created_at = new Date().toISOString()
    }
  }

  $beforeUpdate() {
    if (has(this, 'updated_at')) {
      this.updated_at = new Date().toISOString()
    }
  }
}

module.exports = Base
