exports.up = (knex, Promise) => {
  return knex.schema.createTableIfNotExists('genres', table => {
    table.increments()
    table.string('name')
    table.timestamps()
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('genres')
};
