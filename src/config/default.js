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
  database: {
    pool: { min: process.env.DATABASE_POOL_MIN || 0, max: process.env.DATABASE_POOL_MAX || 5 },
  },
  auth: {
    secret: process.env.AUTH_SECRET
      || ' 0ec9489b33b607d83d5b55ec79437b73acb88c648ff9da78f3cfaa7500be19928dfc6563480fbc821e9bab83418357b1',
    saltRounds: 10,
    resetPasswordTokenLength: 20,
    createOptions: {
      // expires in 2h
      expiresIn: 2 * 60 * 60,
      algorithm: 'HS256',
      issuer: `com.music_library.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.music_library.${env}`,
    },
  },
})
