const config = require('./src/config')

module.exports = {
  [config.env]: config.database,
}
