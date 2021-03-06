exports.up = knex => knex.schema.createTableIfNotExists('users', table => {
  table.increments()
  table.string('name')
  table.string('email').unique()
  table.string('password')
  table.timestamps()
})

exports.down = knex => knex.schema.dropTableIfExists('users')
