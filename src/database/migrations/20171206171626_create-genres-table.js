exports.up = knex => knex.schema.createTableIfNotExists('genres', table => {
  table.increments()
  table.string('name')
  table.timestamps()
})

exports.down = knex => knex.schema.dropTableIfExists('genres')
