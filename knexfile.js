require('dotenv').config({ silent: false })

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: './src/database/migrations',
    },
  },
  test: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME_TEST,
    },
    pool: { min: 0, max: 5 },
    migrations: {
      directory: './src/database/migrations',
    },
  },
}
