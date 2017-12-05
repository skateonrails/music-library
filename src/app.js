const Koa = require('koa')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')
const cluster = require('./cluster')
const log = require('./common/logger')
const routes = require('./routes')

const app = new Koa()
app.use(koaCompress())
app.use(koaBody({ multipart: true }))
app.use(koaCors({
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
}))

app.use(routes)

app.start = () => {
  log.info('Starting server ...')
  app.server = app.listen('3000', () => {
    log.info('==> 🌎  Server listening on port 3000.')
  })
}

app.stop = () => {
  if (!app.server) {
    log.warn('Server not initialized yet.')
    return
  }

  log.info('Stopping server ...')
  app.server.close(() => {
    log.info('Server stopped.')
  })
}

// Something can happen outside the error handling middleware, keep track of that
app.on('error', err => log.error(err, 'Unhandled application error.'))

if (require.main === module || !cluster.isMaster) {
  app.start()

  process.once('SIGINT', () => app.stop())
  process.once('SIGTERM', () => app.stop())
}

module.exports = app
