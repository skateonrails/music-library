const Base = require('./base')

class UserModel extends Base {
  static get tableName() {
    return 'users'
  }
}

module.exports = UserModel
