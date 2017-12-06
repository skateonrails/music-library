const objection = require('objection')
const knex = require('knex')

const Model = objection.Model

const database = {}

Model.knex(knex)

database.knex = knex
database.Model = Model

module.exports = database
