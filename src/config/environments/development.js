module.exports = {
  database: {
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST || '127.0.0.1',
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
  }
}
