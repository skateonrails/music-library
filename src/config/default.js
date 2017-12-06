const pkg = require('../../package')

module.exports = env => ({
  env,
  appName: 'music-library',
  version: pkg.version,
  server: {
    concurrency: process.env.WEB_CONCURRENCY || 1,
    port: process.env.PORT || 3000,
    maxMemory: process.env.WEB_MEMORY || 512,
    killTimeout: 3000,
    bodyParser: {
      multipart: true,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'Date',
        'ETag',
      ],
      maxAge: 3600,
    },
  },
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
    },
  },
})
