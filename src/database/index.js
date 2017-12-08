const config = require('./../config')
const objection = require('objection')
const knex = require('knex')(require('./../../knexfile')[config.env])

const Model = objection.Model
Model.knex(knex)

module.exports = {
  Model,
  knex,
}
