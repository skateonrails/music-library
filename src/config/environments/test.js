module.exports = {
  logging: {
    stdout: {
      enabled: true,
      level: 'error',
    },
  },
  database: {
    connection: {
      database: process.env.DATABASE_NAME_TEST,
    },
  }
}
