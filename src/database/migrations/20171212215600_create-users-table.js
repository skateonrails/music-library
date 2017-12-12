exports.up = (knex, Promise) => {
  return knex.schema.createTableIfNotExists('users', table => {
    table.increments()
    table.string('name')
    table.string('email').unique()
    table.string('password')
    table.timestamps()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('users')
}
